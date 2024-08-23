import { contextBridge, ipcRenderer } from 'electron'
// Expose ipcRenderer.invoke via preload
contextBridge.exposeInMainWorld('api', {
    sayHello: (param: string) => ipcRenderer.invoke('sayHello', param)
})