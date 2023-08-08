function turnOnAirplaneMode(){ 
  const userData = PropertiesService.getUserProperties();  
  let userDataVal = userData.getProperty('redactedImagesArray')

  if(!userDataVal){ userData.setProperty('redactedImagesArray', '') }

  let selectedImage = SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements()[0] 

  if(selectedImage.getPageElementType() == "IMAGE"){
 
    let blob = selectedImage.asImage().getBlob() 
    // create a folder first, called macabacus?

    let folder = DriveApp.getFoldersByName('macabacusX')

    if(folder.hasNext()){

      // save image in folder then replace with black image
      let macabacusFolder = folder.next()

      let originalImageToRedact = macabacusFolder.createFile(blob)

      let imageData = {
        id: originalImageToRedact.getId(),
        url: originalImageToRedact.getDownloadUrl()
      }

      // get current list of redacted images 
      let redacted = userData.getProperty('redactedImagesArray')

      if(!redacted){
        userData.setProperty('redactedImagesArray', JSON.stringify([imageData]))
      }else{ 
        let array = JSON.parse(redacted)
        array.push(imageData)
        userData.setProperty('redactedImagesArray', JSON.stringify(array))
      }

      // we can now replace the image with the image from the drive 
      let blackImageFromDrive = userData.getProperty('redactImage')


      let blackImageToInsert = JSON.parse(blackImageFromDrive)
      // replace image, should also check to make sure this image exists

      selectedImage.asImage().replace(blackImageToInsert.url, true)






    //=============================================
    // Error here, since URL cannot be access, we can not replace the image with the black image.
    // so, here we need to insert new image, and remove the original



    // we also need to keep track of all REDACTED or "black images" since we will be replacing each one!













    }else{
      let newFolder = DriveApp.createFolder('macabacusX')

      let originalImageToRedact = newFolder.createFile(blob)

      // add the original image
      let imageData = {
        id: originalImageToRedact.getId(),
        url: originalImageToRedact.getDownloadUrl()
      }

      // get current list of redacted images 
      let redacted = userData.getProperty('redactedImagesArray')

      if(!redacted){
        userData.setProperty('redactedImagesArray', JSON.stringify([imageData]))
      }else{ 
        let array = JSON.parse(redacted)
        array.push(imageData)
        userData.setProperty('redactedImagesArray', JSON.stringify(array))
      }


      //add the black image for redaction
      
      let blackImage = selectedImage.asImage().replace('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Very_Black_screen.jpg/800px-Very_Black_screen.jpg?20200816082819', true) 

      let blackBlob = blackImage.getBlob()
      
      let driveBlackImage = newFolder.createFile(blackBlob)

      userData.setProperty('blackImage', JSON.stringify({
        id: driveBlackImage.getId(),
        url: driveBlackImage.getDownloadUrl()
      }))
    }
  } 
}

function turnOffAirplaneMode(){

//1w4gsJSSpSJMAZdxTeQcakgHxqa-mhYUI
  const userData = PropertiesService.getUserProperties();  
  let userDataVal = userData.getProperty('airplaneMode')

  let data = JSON.parse(userDataVal)

  let imageId = data[0].driveId

  // console.log(imageId)

  let imageFromDrive = DriveApp.getFileById(imageId)

  // let imageToConvert = SlidesApp.getActivePresentation().getPageElementById(imageId)

  console.log(imageFromDrive.getUrl())


}
