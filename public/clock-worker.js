self.onmessage = function (e) {
    var type = e.data.type;
    var ms = e.data.ms;
    console.log('Worker received message:', type, ms)

    switch (type) {
        case 'start':
            self.postMessage({type: 'start'});
            setInterval(function () {
                self.postMessage({type: 'tick'});
            }, ms);
            break;
        case 'stop':
            self.postMessage({type: 'stop'});
            self.close();
            break;
        case "reset":
            self.postMessage({type: "reset"});
            break;
    }
}
