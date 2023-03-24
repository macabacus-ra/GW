function conformWidth(){
  const userProperties = PropertiesService.getUserProperties(); 
  const firstShapeId = userProperties.getProperty('firstShapeId');
  if(!firstShapeId){SlidesApp.getUi().alert('Select a shape as first...'); return;}

  let slideWidth = SlidesApp.getActivePresentation().getPageWidth()
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){SlidesApp.getUi().alert('Select one or more shapes to perform this operation') }

  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length === 1){ 
      elements[0].setLeft(0)
      elements[0].setWidth(slideWidth)
  
    } else if(elements.length > 1){ 

      let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
      let shapeWidth = firstSelectedShape.getWidth()

      elements.map((shape) => {
        let width = shape.getWidth()

        if(width && shape.getObjectId() !== firstShapeId ){ 
          shape.setWidth(shapeWidth)
        }
      }); 
      return;
    }
  }
}  




function conformHeight() {
  const userProperties = PropertiesService.getUserProperties(); 
  const firstShapeId = userProperties.getProperty('firstShapeId');
  if(!firstShapeId){SlidesApp.getUi().alert('Select a shape as first...'); return;}
  let slideHeight = SlidesApp.getActivePresentation().getPageHeight()
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }

  if (pageElementRange){
    let elements = pageElementRange.getPageElements()
    if(elements.length === 1){ 
      elements[0].setTop(0)
      elements[0].setHeight(slideHeight)
    } else if(elements.length > 1){ 
      let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
      let shapeHeight = firstSelectedShape.getHeight()
      elements.map((shape) => {
        let height = shape.getHeight()
        if(height && shape.getObjectId() !== firstShapeId ){ 
          shape.setHeight(shapeHeight)
        }
      }); 
      return;
    }
  }        
}

function conformSize() {
  const userProperties = PropertiesService.getUserProperties(); 
  const firstShapeId = userProperties.getProperty('firstShapeId');
  if(!firstShapeId){SlidesApp.getUi().alert('Select a shape as first...'); return;}
  let slideHeight = SlidesApp.getActivePresentation().getPageHeight()
  let slideWidth = SlidesApp.getActivePresentation().getPageWidth()
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()
    if(elements.length === 1){ 
      elements[0].setTop(0)
      elements[0].setLeft(0)
      elements[0].setHeight(slideHeight)
      elements[0].setWidth(slideWidth)

    } else if(elements.length > 1){ 
      let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
      let shapeHeight = firstSelectedShape.getHeight()
      let shapeWidth = firstSelectedShape.getWidth()

      elements.map((shape) => {
        let width = shape.getWidth()
        if(width && shape.getObjectId() !== firstShapeId ){ 
          shape.setHeight(shapeHeight)
          shape.setWidth(shapeWidth)
        }
      }); 
      return;
    }
  }
}        
