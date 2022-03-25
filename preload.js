const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, ...data) => {
            let validChannels = ["resize"];
            console.log(data);
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, ...data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);