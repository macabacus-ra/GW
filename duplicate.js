function duplicateShape() {
  //duplicate shape on all other slides

  let selections = SlidesApp.getActivePresentation().getSelection()

  let pageElementRange = selections.getPageElementRange()

  if(!pageElementRange){ SlidesApp.getUi().alert('Select a single shape to perform this operation');return }

  if (pageElementRange){
    
    let elements = pageElementRange.getPageElements()
    if(elements.length > 1){ SlidesApp.getUi().alert('Select a single shape to perform this operation');return }
    
    //get active slide
    let activeSlideId = selections.getCurrentPage().getObjectId()

    let shape = elements[0].asShape()
    
    let slides = SlidesApp.getActivePresentation().getSlides()

    //loop through all slides in presentation
    slides.map((slide) => {
      if( activeSlideId !== slide.getObjectId()){ slide.insertShape(shape) }
    })
  }
}
