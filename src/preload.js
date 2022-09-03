const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs');

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
});
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // we can also expose variables, not just functions
});
contextBridge.exposeInMainWorld('radiogram', {
  save: (data) => ipcRenderer.invoke('saveRadiogram', data),
  load: (data) => ipcRenderer.invoke('loadRadiogram', data)
});
