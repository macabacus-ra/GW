
function showMultiplyShapeDialog() {

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ 
    SlidesApp.getUi().alert('Select a single shape to perform this operation');
    return 
  }

  if (pageElementRange){
    let elements = pageElementRange.getPageElements()
    if(elements.length > 1){ SlidesApp.getUi().alert('Select a single shape to perform this operation');
    return }
  }

   var html = HtmlService.createHtmlOutputFromFile('multiplyDialog')
      .setWidth(400)
      .setHeight(300);
  SlidesApp.getUi()
      .showModalDialog(html, 'Multiply Shape');
}





function multiplyShape(r = 1, c = 1, rSpacing = 1, cSpacing = 1) {

  // let rows = 4;
  // let columns = 3;
  // let rowSpacing = 2;
  // let colSpacing = 2;


  let rows = r;
  let columns = c;
  let rowSpacing = rSpacing;
  let colSpacing = cSpacing;

  let selections = SlidesApp.getActivePresentation().getSelection()

  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('Select a single shape to perform this operation');return }


  if (pageElementRange){
    let elements = pageElementRange.getPageElements()
    if(elements.length > 1){ SlidesApp.getUi().alert('Select a single shape to perform this operation');return }
    

    let shape = elements[0]
    let shapeHeight = shape.getHeight();
    let shapeWidth = shape.getWidth()
    let shapeTop = shape.getTop()
    let shapeLeft = shape.getLeft()

    for(let rowIndex = 0; rowIndex < rows; rowIndex++ ){
      for(let colIndex = 0; colIndex < columns; colIndex++){

        let leftPosition = shapeLeft + (shapeWidth*rowIndex + rowSpacing*rowIndex)
        let topPosition = shapeTop + (shapeHeight*colIndex + colSpacing*colIndex)

        let newShape = shape.duplicate()
        
        newShape.setTop(topPosition)
        newShape.setLeft(leftPosition)
        
        
      }
    }
    // in this next line of code, we can delete the original shape since the loop creates a new shape over the original
    // in the for loop you can do a check if rowIndex and coluIndex are 0 then don't duplicate since that would duplicate the first shape.
    // so you can do that or just delete the first shape. either way, if you don't do this you will have 2 shapes at the very top left.
    shape.remove()
    
  }
}
