function turnOnAirplaneMode(){ 
  const userData = PropertiesService.getUserProperties();  
  let userDataVal = userData.getProperty('redactedImagesArray')
  if(!userDataVal){ userData.setProperty('redactedImagesArray', '') }
  let selectedImage = SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements()[0] 

  if(selectedImage.getPageElementType() == "IMAGE"){
    let blob = selectedImage.asImage().getBlob() 
    // create a folder first, called macabacus?
    let folder = DriveApp.getFoldersByName('macabacus1')

    if(folder.hasNext()){
      // save image in folder then replace with black image
      let macabacusFolder = folder.next()
      let originalImageToRedact = macabacusFolder.createFile(blob)

      // to drive
      let imageData = { 
        driveId: originalImageToRedact.getId(),
        slidesId: selectedImage.getObjectId()
      }

      // get current list of redacted images 
      let redacted = userData.getProperty('redactedImagesArray1')

      if(!redacted){
        userData.setProperty('redactedImagesArray1', JSON.stringify([imageData]))
      }else{ 
        let array = JSON.parse(redacted)
        array.push(imageData)
        userData.setProperty('redactedImagesArray1', JSON.stringify(array))
      }

      // we can now replace the image with the image from the drive 
      let blackImageFromDrive = userData.getProperty('redactImage')
      let blackImageID = JSON.parse(blackImageFromDrive).id
      let blob1 = DriveApp.getFileById(blackImageID).getBlob()
      selectedImage.asImage().replace(blob1, true)


    }else{
      let newFolder = DriveApp.createFolder('macabacus1')

      let originalImageToRedact = newFolder.createFile(blob)

      // add the original image
      let imageData = {
        driveId: originalImageToRedact.getId(),
        slidesId: selectedImage.getObjectId()
      }

      // get current list of redacted images 
      let redacted = userData.getProperty('redactedImagesArray1')

      if(!redacted){
        userData.setProperty('redactedImagesArray1', JSON.stringify([imageData]))
      }else{ 
        let array = JSON.parse(redacted)
        array.push(imageData)
        userData.setProperty('redactedImagesArray1', JSON.stringify(array))
      }

      //add the black image for redaction
      let blackImage = selectedImage.asImage().replace('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Very_Black_screen.jpg/800px-Very_Black_screen.jpg?20200816082819', true) 
      let blackBlob = blackImage.getBlob()
      let driveBlackImage = newFolder.createFile(blackBlob)
      userData.setProperty('blackImage', JSON.stringify({
        id: driveBlackImage.getId()
      }))
    }
  } 
}

function turnOffAirplaneMode(){
  const userData = PropertiesService.getUserProperties();  
  let userDataVal = userData.getProperty('redactedImagesArray1')
  let data = JSON.parse(userDataVal)
  let slidesId = data[0].slidesId
  let driveFileId = data[0].driveId
  // console.log(JSON.stringify(data))
  let currentBlackImage = SlidesApp.getActivePresentation().getPageElementById(slidesId).asImage()
  let originalDriveImageBlob = DriveApp.getFileById(driveFileId).getBlob()
  currentBlackImage.replace(originalDriveImageBlob, true) 
}
