self.onmessage = (e) => {
    console.log("Message received", e.data)
    self.postMessage("Pong")
}
