function conformWidth(){
    let slideWidth = SlidesApp.getActivePresentation().getPageWidth()
    let selections = SlidesApp.getActivePresentation().getSelection()
    let pageElementRange = selections.getPageElementRange()
    if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
  
    if (pageElementRange){
      let elements = pageElementRange.getPageElements()
  
      if(elements.length === 1){ 
  
        elements[0].setLeft(0)
        elements[0].setWidth(slideWidth)
        
      } else if(elements.length > 1){ 
  
        let defaultWidth = elements[0].getWidth() //this is in case there is no shape in the "First Selected Shape" frpm the user properties
  
        const userProperties = PropertiesService.getUserProperties(); 
        const firstShapeId = userProperties.getProperty('firstShapeId');
  
        // check to make sure the firstSelectedShape *IS* within the selected range, other wise unwanted alignments will be produced
        if(firstShapeId && elements.find(shape => shape.getObjectId() === firstShapeId)) {  // if there is a "first shape" selected and stored in user properties (memory)
  
  
          let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
          let shapeWidth = firstSelectedShape.getWidth()
  
          elements.map((shape) => {
            let width = shape.getWidth()
  
            if(width && shape.getObjectId() !== firstShapeId ){ 
              shape.setWidth(shapeWidth)
            }
          }); 
          return;
  
        }else{   // if no shape is found in the "first selected shape" user properties settings
  
          elements.map( (shape) => {
              let width = shape.getWidth()
              if(width){  shape.setWidth(defaultWidth) }
          }); 
          return;
        }
      }
    }  
  }
  
  
  
  function conformHeight() {
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
  
        let defaultHeight = elements[0].getHeight() //this is in case there is no shape in the "First Selected Shape" from the user properties
  
        const userProperties = PropertiesService.getUserProperties(); 
        const firstShapeId = userProperties.getProperty('firstShapeId');
  
        // check to make sure the firstSelectedShape *IS* within the selected range, other wise unwanted alignments will be produced
        if(firstShapeId && elements.find(shape => shape.getObjectId() === firstShapeId)) {  // if there is a "first shape" selected and stored in user properties (memory)
  
  
          let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
          let shapeHeight = firstSelectedShape.getHeight()
  
          elements.map((shape) => {
            let height = shape.getHeight()
  
            if(height && shape.getObjectId() !== firstShapeId ){ 
              shape.setHeight(shapeHeight)
            }
          }); 
          return;
  
        }else{   // if no shape is found in the "first selected shape" user properties settings
  
          elements.map( (shape) => {
              let height = shape.getHeight()
              if(height){  shape.setHeight(defaultHeight) }
          }); 
          return;
        }
      }
    }        
  }
  
  function conformSize() {
  
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
  
        let defaultHeight = elements[0].getHeight() //this is in case there is no shape in the "First Selected Shape" from the user properties
        let defaultWidth = elements[0].getWidth() //this is in case there is no shape in the "First Selected Shape" from the user properties
  
        const userProperties = PropertiesService.getUserProperties(); 
        const firstShapeId = userProperties.getProperty('firstShapeId');
  
        // check to make sure the firstSelectedShape *IS* within the selected range, other wise unwanted alignments will be produced
        if(firstShapeId && elements.find(shape => shape.getObjectId() === firstShapeId)) {  // if there is a "first shape" selected and stored in user properties (memory)
  
  
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
  
        }else{   // if no shape is found in the "first selected shape" user properties settings
  
          elements.map( (shape) => {
            let height = shape.getHeight()
            if(height){  
              shape.setHeight(defaultHeight)
              shape.setWidth(defaultHeight)
            }
          }); 
          return;
        }
      }
    }        
  }