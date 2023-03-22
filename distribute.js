function distributeVertically() {
    let gap = 1;
  
    let selections = SlidesApp.getActivePresentation().getSelection()
    let pageElementRange = selections.getPageElementRange()
  
    if (pageElementRange){
      let elements = pageElementRange.getPageElements()
  
      if(elements.length >= 2){   
        let sorted = elements.sort((a, b) => a.getTop() - b.getTop());
  
        let topEdge = sorted[0].getTop();
        let bottomEdge = (sorted.at(-1).getTop() + sorted.at(-1).getHeight())
        let rangeHeight = bottomEdge - topEdge; // or absolute value of top - bottom
        let gapSum = gap * (elements.length - 1);
        let shapesHeightSum = rangeHeight - gapSum;
        let newShapeHeight = shapesHeightSum / elements.length;
  
        sorted.map((shape, index) => { 
          if (index === 0) { //if  current shape is THE top most, which is the first in the sorted array
            //shape.setTop() does not need to change since this is the top most
            shape.setHeight(newShapeHeight)
          } else if (index === sorted.length - 1) { //if  current shape is THE bottom most,  which is the last in the sorted array
            shape.setTop(bottomEdge - newShapeHeight)
            shape.setHeight(newShapeHeight)
          } else {  // all other shapes in between the top most and bottom most
            shape.setTop(sorted[index - 1].getTop() + newShapeHeight + gap);
            shape.setHeight(newShapeHeight)
          }
        })
      }else{
        console.log('dSelect two or more shapes to perform this operation')
      }
    }       
  }
  
  function distributeHorizontally() {
    let gap = 1;
    let selections = SlidesApp.getActivePresentation().getSelection()
    let pageElementRange = selections.getPageElementRange()
  
    if (pageElementRange){
      let elements = pageElementRange.getPageElements()
  
  
      if(elements.length >= 2){   
  
        let sorted = elements.sort((a, b) => a.getLeft() - b.getLeft());
  
        let leftEdge = sorted[0].getLeft();
        let rightEdge = (sorted.at(-1).getLeft() + sorted.at(-1).getWidth())
        let rangeWidth = rightEdge - leftEdge; // or absolute value of right - left
        let gapSum = gap * (elements.length - 1);
        let shapesWidthSum = rangeWidth - gapSum;
        let newShapesWidth = shapesWidthSum / elements.length;
  
        sorted.map((shape, index) => {
          if (index === 0) { //if  current shape is THE left most, which is the first in the sorted array
            //shape.setLeft() does not need to change since this is the left most
            shape.setWidth(newShapesWidth)
          } else if (index === sorted.length - 1) { //if  current shape is THE bottom most,  which is the last in the sorted array
            shape.setLeft(rightEdge - newShapesWidth)
            shape.setWidth(newShapesWidth)
          } else {  // all other shapes in between the top most and bottom most
            shape.setLeft(sorted[index - 1].getLeft() + newShapesWidth + gap);
            shape.setWidth(newShapesWidth)
          }
        })
      }else{
        console.log('dSelect two or more shapes to perform this operation')
      }
    }       
  }