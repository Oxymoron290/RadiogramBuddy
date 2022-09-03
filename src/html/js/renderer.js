document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})
  
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, versions[dependency]())
  }
})

const func = async () => {
  const response = await window.versions.ping()
  document.getElementById('resultForFunc').innerHTML = response;
}

document.getElementById('mainCall').onclick = () => func();