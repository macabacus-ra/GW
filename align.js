function alignRight() {
    let slideWidth = SlidesApp.getActivePresentation().getPageWidth()
    let selections = SlidesApp.getActivePresentation().getSelection()
    let pageElementRange = selections.getPageElementRange()
    if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
    if (pageElementRange){
      let elements = pageElementRange.getPageElements()
  
      if(elements.length === 1){ elements[0].setLeft(slideWidth - elements[0].getWidth()) } // if only one shape is selected, set to left edge
  
      else if(elements.length > 1){  
  
        let shapes = {
          initialRight: (elements[0].getLeft() + elements[0].getWidth()).toFixed(4),
          areAligned: true
        };
  
        for (let i = 0; i < elements.length; i++) {
          let currentRightPosition = (elements[i].getLeft() + elements[i].getWidth()).toFixed(4)
  
          if (currentRightPosition !== shapes.initialRight) {
            shapes.areAligned = false; // there is a shape that is not aligned
            break;
          }
        }
  
        if(!shapes.areAligned){ 
          //shapes not aligned to each other, align to first selected
          const userProperties = PropertiesService.getUserProperties();  // get user properties 
          const firstShapeId = userProperties.getProperty('firstShapeId');
  
        //***************  check to make sure the firstSelectedShape *IS* within the selected range, other wise unwanted alignments will be produced
          if(firstShapeId && elements.find(shape => shape.getObjectId() === firstShapeId)) {
            // if there is a "first shape" selected and stored in user properties (memory)
  
            let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
  
            elements.map((shape) => {
              let width = shape.getWidth()
  
              if(width && shape.getObjectId() !== firstShapeId ){ 
                shape.setLeft((firstSelectedShape.getLeft() + firstSelectedShape.getWidth()) - width)
              }
            }); 
            return;
  
          }else{   // if no shape is set as first selected shape 
  
            elements.map( (shape) => {
                let width = shape.getWidth()
                if(width){ 
                  shape.setLeft(shapes.initialRight - width)
                }
            }); 
            return;
          }
  
        }else{ //if shapes are already aligned, align to the right of the page,
          elements.map( (shape) => {
            let width = shape.getWidth()
            if(width){
              shape.setLeft(slideWidth - width)
            }
          }); 
          return;
        }
      }
    }
  }       
  
  function alignLeft() {
    let selections = SlidesApp.getActivePresentation().getSelection()
    let pageElementRange = selections.getPageElementRange()
    if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
    if (pageElementRange){
      let elements = pageElementRange.getPageElements()
      if(elements.length === 1){ elements[0].setLeft(0) } // if only one shape is selected, set to left edge
      
      else if(elements.length > 1){ 
  
        let shapes = {
          initialLeft: elements[0].getLeft().toFixed(4),
          areAligned: true
        };
  
        for (let i = 0; i < elements.length; i++) {
          let currentLeftPosition = elements[i].getLeft().toFixed(4)
  
          if (currentLeftPosition !== shapes.initialLeft) {
            shapes.areAligned = false; // there is a shape that is not aligned
            break;
          }
        }
  
        if(!shapes.areAligned){ 
          const userProperties = PropertiesService.getUserProperties();  // get user properties 
          const firstShapeId = userProperties.getProperty('firstShapeId');
  
          //***************  check to make sure the firstSelectedShape *IS* within the selected range, other wise unwanted alignments will be produced
          if(firstShapeId && elements.find(shape => shape.getObjectId() === firstShapeId)) {
            // if there is a "first shape" selected and stored in user properties (memory)
  
            let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
  
            elements.map((shape) => {
              let width = shape.getWidth()
  
              if(width && shape.getObjectId() !== firstShapeId ){ 
                shape.setLeft(firstSelectedShape.getLeft())
              }
            }); 
            return;
  
          }else{   // if no shape is set as first selected shape 
  
            elements.map( (shape) => {
                let width = shape.getWidth()
                if(width){  shape.setLeft(shapes.initialLeft ) }
            }); 
            return;
          }
  
        }else{ //if shapes are already aligned, align to the left of the page,
          elements.map( (shape) => {
            let width = shape.getWidth()
            if(width){ shape.setLeft(0) }
          }); 
          return;
        }
      }
    }       
  }
  
  
  function alignTop() {
    let selections = SlidesApp.getActivePresentation().getSelection()
    let pageElementRange = selections.getPageElementRange()
  
    if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
  
    if (pageElementRange){
      let elements = pageElementRange.getPageElements()
  
      if(elements.length === 1){ elements[0].setTop(0) }
      
      else if(elements.length > 1){  
  
        let shapes = {
          initialTop: elements[0].getTop().toFixed(4),
          areAligned: true
        };
  
        for (let i = 0; i < elements.length; i++) {
  
          let currentTopPosition = elements[i].getTop().toFixed(4)
  
          if (currentTopPosition !== shapes.initialTop) {
            shapes.areAligned = false; // there is a shape that is not aligned
            break;
          }
        }
  
        if(!shapes.areAligned){ 
          const userProperties = PropertiesService.getUserProperties();  // get user properties 
          const firstShapeId = userProperties.getProperty('firstShapeId');
  
          if(firstShapeId && elements.find(shape => shape.getObjectId() === firstShapeId)) {  // if there is a "first shape" selected and stored in user properties (memory)
  
            let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
  
            elements.map((shape) => {
              let width = shape.getWidth()
              if(width){ shape.setTop(firstSelectedShape.getTop()) }
            }); 
            return;
  
          }else{
  
            elements.map( (shape) => {
                let width = shape.getWidth()
                if(width){  shape.setTop(shapes.initialTop) }
            }); 
            return;
          }
  
        }else{ //if shapes are already aligned, align to the top of the page,
  
          elements.map( (shape) => {
            let width = shape.getWidth()
            if(width){ shape.setTop(0) }
          }); 
          return;
  
        }
      } 
    }
  }
  
  function alignBottom() {
    let slideHeight = SlidesApp.getActivePresentation().getPageHeight()
    let selections = SlidesApp.getActivePresentation().getSelection()
    let pageElementRange = selections.getPageElementRange()
  
    if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
  
    if (pageElementRange){
     let elements = pageElementRange.getPageElements()
  
      if(elements.length === 1){ elements[0].setTop(slideHeight - elements[0].getHeight()) } // if only one shape is selected, set to bottom edge
  
      else if(elements.length > 1){  
  
        let shapes = {
          initialBottom: (elements[0].getTop() + elements[0].getHeight()).toFixed(4),
          areAligned: true
        };
  
        for (let i = 0; i < elements.length; i++) {
          let currentBottomPosition = (elements[i].getTop() + elements[i].getHeight()).toFixed(4)
  
          if (currentBottomPosition !== shapes.initialBottom) {
            shapes.areAligned = false; // there is a shape that is not aligned
            break;
          }
        }
  
        if(!shapes.areAligned){  //shapes not aligned to each other, align to first selected
          const userProperties = PropertiesService.getUserProperties();  // get user properties 
          const firstShapeId = userProperties.getProperty('firstShapeId');
  
          if(firstShapeId && elements.find(shape => shape.getObjectId() === firstShapeId)) {  // if there is a "first shape" selected and stored in user properties (memory)
            let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
  
            elements.map((shape) => {
              let height = shape.getHeight()
  
              if(height && shape.getObjectId() !== firstShapeId ){ 
                shape.setTop((firstSelectedShape.getTop() + firstSelectedShape.getHeight()) - height)
              }
            }); 
            return;
  
          }else{ // if there is no shape in user properties "memory" set as first selected shape "slides default"
            elements.map( (shape) => {
              let height = shape.getHeight()
              if(height){  shape.setTop(shapes.initialBottom - height) }
            }); 
            return;
          }
        }else{ //if shapes are already aligned, align to the bottom of the page,
          elements.map((shape) => {
            let height = shape.getHeight()
            if(height){ shape.setTop(slideHeight - height) }
          }); 
          return;
        }
      }
    }       
  }
  
  
  function centerHorizontally() {
    let slideWidth = SlidesApp.getActivePresentation().getPageWidth()
    let selections = SlidesApp.getActivePresentation().getSelection()
    let pageElementRange = selections.getPageElementRange()
    if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
    if (pageElementRange){
      let elements = pageElementRange.getPageElements()
  
      if(elements.length === 1){ 
        elements[0].setLeft( (slideWidth/2) - (elements[0].getWidth()/2) ) 
        
      } else if(elements.length > 1){ 
        let defaultHorizontalCenter = (elements[0].getLeft() + (elements[0].getWidth()/2)).toFixed(4)
        const userProperties = PropertiesService.getUserProperties();  // get user properties 
        const firstShapeId = userProperties.getProperty('firstShapeId');
  
        // check to make sure the firstSelectedShape *IS* within the selected range, other wise unwanted alignments will be produced
        if(firstShapeId && elements.find(shape => shape.getObjectId() === firstShapeId)) {
          // if there is a "first shape" selected and stored in user properties (memory)
  
          let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
          let centerPos = (firstSelectedShape.getLeft() + (firstSelectedShape.getWidth()/2))
  
          elements.map((shape) => {
            let width = shape.getWidth()
  
            if(width && shape.getObjectId() !== firstShapeId ){ 
              shape.setLeft(centerPos - (width/2))
            }
          }); 
          return;
  
        }else{   // if no shape is found in the "first selected shape" user properties settings
  
          elements.map( (shape) => {
              let width = shape.getWidth()
              if(width){  shape.setLeft(defaultHorizontalCenter - (width/2) ) }
          }); 
          return;
        }
      }
    }       
  }
  
  function centerVertically() {
    let slideHeight = SlidesApp.getActivePresentation().getPageHeight()
    let selections = SlidesApp.getActivePresentation().getSelection()
    let pageElementRange = selections.getPageElementRange()
    if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
    if (pageElementRange){
      let elements = pageElementRange.getPageElements()
  
      if(elements.length === 1){ 
        elements[0].setTop( (slideHeight/2) - (elements[0].getHeight()/2) ) 
        
      } else if(elements.length > 1){ 
        let defaultVerticalCenter = (elements[0].getTop() + (elements[0].getHeight()/2)).toFixed(4)
        const userProperties = PropertiesService.getUserProperties();  // get user properties 
        const firstShapeId = userProperties.getProperty('firstShapeId');
  
        // check to make sure the firstSelectedShape *IS* within the selected range, other wise unwanted alignments will be produced
        if(firstShapeId && elements.find(shape => shape.getObjectId() === firstShapeId)) {
          // if there is a "first shape" selected and stored in user properties (memory)
  
          let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
          let centerPos = (firstSelectedShape.getTop() + (firstSelectedShape.getHeight()/2))
  
          elements.map((shape) => {
            let height = shape.getHeight()
  
            if(height && shape.getObjectId() !== firstShapeId ){ 
              shape.setTop(centerPos - (height/2))
            }
          }); 
          return;
  
        }else{   // if no shape is found in the "first selected shape" user properties settings
  
          elements.map( (shape) => {
              let height = shape.getHeight()
              if(width){  
                shape.setTop(defaultVerticalCenter - (height/2) ) 
              }
          }); 
          return;
        }
      }
    }       
  }
  