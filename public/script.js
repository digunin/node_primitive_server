const host_url = encodeURI('http://localhost:5500/')

filePicker = document.getElementById('send-file')
empty_image = document.getElementById('empty-image')

filePicker.onchange = () => {
  let GetFile = new FileReader()
  let file = filePicker.files[0]
  GetFile.readAsArrayBuffer(file)
  let ext = file.name.slice(file.name.lastIndexOf('.') + 1)
  GetFile.onload = function () {
    fetch(ext, {
      method: 'POST',
      body: GetFile.result,
    })
      .then((res) => res.text())
      .then((data) => {
        empty_image.src = data
      })
      .catch((e) => console.log(e))
  }
}
