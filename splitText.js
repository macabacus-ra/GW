function splitText() {
    //duplicate shape on all other slides
  
    let selections = SlidesApp.getActivePresentation().getSelection()
    let pageElementRange = selections.getPageElementRange()
  
    if(!pageElementRange){ SlidesApp.getUi().alert('Select a single shape to perform this operation');return }
  
    if (pageElementRange){
      let elements = pageElementRange.getPageElements()
      if(elements.length > 1){ SlidesApp.getUi().alert('Select a single shape to perform this operation');return }
  
      let shape = elements[0].asShape()
      let shapeHeight = shape.getHeight();
      let shapeTop = shape.getTop()
      let shapeText = shape.getText()
      let paragraphsRaw = shapeText.asString().split(/\r?\n|\r|\n/g);
      let paragraphs = paragraphsRaw.slice(0, -1) // seems like we are getting an extra unwanted array item from paragraphsRaw
      let pCount = paragraphs.length
      let newShapeHeight = ( shapeHeight / pCount )
      
      let p = shape.getText().getParagraphs()
  
  
      p.map((paragraph, index) => {
        let newShapeTop = (shapeTop + ((shapeHeight/pCount)*index))
        let newShape = shape.duplicate()
  
        newShape.setHeight(newShapeHeight)
        newShape.setTop(newShapeTop)
  
        newShape.asShape().getText().clear()
        newShape.asShape().getText().insertRange(0, paragraph.getRange())
  
      })
      shape.remove()
    }
  }
  