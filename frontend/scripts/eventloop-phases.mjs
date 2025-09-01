// eventloop-phases.mjs (Node 18+)
// Prints when each event-loop phase runs (timers, pending callbacks, poll, check, close)
// plus microtasks. Use --fetch to include a 1s HTTP request demo.
//
// Run: node scripts/eventloop-phases.mjs [--fetch]
//npm run eventloop:fetch

// 0ms  MAIN  : start of script
// 7ms  INFO  : starting fetch (~1s)…
// 106ms  INFO  : idle/prepare is internal (annotated only)
// 106ms  MAIN  : end of script
// 108ms  POLL  : server listening on port 54910
// 109ms  CHECK : setImmediate() from main (may run before/after main setTimeout)
// 110ms  TIMERS: setTimeout(0) from main (may run before/after main setImmediate)
// 114ms  PENDING: TCP connect error (likely in Pending Callbacks) (ECONNREFUSED)
// 122ms  POLL  : client "connect" (I/O in POLL)
// 131ms  CLOSE : client socket "close"
// 133ms  CLOSE : server "close"
// 133ms  POLL  : fs.readFile callback (file I/O done)
// 134ms  MICRO : Promise.then after POLL callback
// 134ms  CHECK : setImmediate scheduled inside POLL callback
// 135ms  CLOSE : server socket "close" (abrupt destroy)
// 135ms  TIMERS: setTimeout(0) scheduled inside POLL callback
// 156ms  FETCH : .then microtask (runs right after POLL resolves the promise)
// 158ms  FETCH : setImmediate inside .then (CHECK, same iteration)
// 159ms  FETCH : setTimeout(0) inside .then (TIMERS, next iteration)

import fs from 'node:fs';
import net from 'node:net';

const t0 = Date.now();
const stamp = (label) => {
    const ms = String(Date.now() - t0).padStart(4, ' ');
    console.log(`${ms}ms  ${label}`);
};

stamp('MAIN  : start of script');

// TIMERS (from main) — fires in a later iteration (order vs setImmediate is NOT guaranteed)
setTimeout(() => {
    stamp('TIMERS: setTimeout(0) from main (may run before/after main setImmediate)');
}, 0);

// CHECK (from main)
setImmediate(() => {
    stamp('CHECK : setImmediate() from main (may run before/after main setTimeout)');
});

// POLL — file I/O
fs.readFile(new URL(import.meta.url), () => {
    stamp('POLL  : fs.readFile callback (file I/O done)');

    // Microtasks flush right after this callback returns
    Promise.resolve().then(() => stamp('MICRO : Promise.then after POLL callback'));

    // Inside I/O: setImmediate runs THIS iteration’s check;
    // setTimeout(0) runs in the NEXT iteration’s timers.
    setImmediate(() => stamp('CHECK : setImmediate scheduled inside POLL callback'));
    setTimeout(() => stamp('TIMERS: setTimeout(0) scheduled inside POLL callback'), 0);
});

// PENDING CALLBACKS — provoke a TCP connect error (often queued here)
const sock = net.connect({ host: '127.0.0.1', port: 9 }); // port 9 usually closed
sock.on('error', (err) => {
    stamp(`PENDING: TCP connect error (likely in Pending Callbacks) (${err.code})`);
    sock.destroy();
});

// CLOSE CALLBACKS — create server, destroy client abruptly to trigger 'close'
const server = net.createServer((socket) => {
    socket.on('close', () => stamp('CLOSE : server socket "close" (abrupt destroy)'));
    socket.destroy(); // schedules close-callbacks
});

server.listen(0, () => {
    const port = server.address().port;
    stamp(`POLL  : server listening on port ${port}`);

    const client = net.connect(port);
    client.on('connect', () => stamp('POLL  : client "connect" (I/O in POLL)'));
    client.on('close', () => {
        stamp('CLOSE : client socket "close"');
        server.close(() => stamp('CLOSE : server "close"'));
    });
});

// Optional: real network fetch (~1s) to show poll → microtask → check → next timers ordering
if (process.argv.includes('--fetch')) {
    if (typeof fetch !== 'function') {
        stamp('INFO  : global fetch not available (Node < 18?)');
    } else {
        stamp('INFO  : starting fetch (~1s)…');
        fetch('http://localhost:8080/csrf', { method: 'GET' })
            .then((r) => r.text())
            .then(() => {
                stamp('FETCH : .then microtask (runs right after POLL resolves the promise)');
                setImmediate(() => stamp('FETCH : setImmediate inside .then (CHECK, same iteration)'));
                setTimeout(() => stamp('FETCH : setTimeout(0) inside .then (TIMERS, next iteration)'), 0);
            })
            .catch((e) => stamp(`FETCH : error ${e?.message ?? e}`));
    }
}

// You can't schedule user JS into idle/prepare; it sits between Pending Callbacks and Poll.
stamp('INFO  : idle/prepare is internal (annotated only)');
stamp('MAIN  : end of script');
