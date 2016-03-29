var fs=require("fs");
var arr,newArray,dataObject,arrayObject=[],filterArrayObject=[],indicatorObjectForPerCapita,indicatorObjectForConstant,countryPlusIndicatorObject,filterCountryName,count=0,index1,index2,index3,index4,index5,countryName,countryCode,indicatorName,indicatorCode,year;
fs.readFile('data.csv',function(err,data){
   if(err){
     console.log(err);
     }
   else{
       dataObject=new Object();
       dataObject.countryName="Country Name";
       dataObject.countryCode="Country Code";
       dataObject.indicatorName="Indicator Name";
       dataObject.indicatorCode="Indicator Code";
       dataObject.year="Year";
       arrayObject.push(dataObject);
       arr = data.toString().split("\n");
    for(var i=0;i<arr.length;i++){
    //  console.log(arr[0]);
       newArray=arr[i].toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);    //((?<=,)|(?=,))
       if(i==0){
          for(var j=0;j<newArray.length;j++){
              if(newArray[j]=="Country Name"){
              index1=j;
              }else if(newArray[j]=="Country Code"){
              index2=j;
              }else if(newArray[j]=="Indicator Name"){
              index3=j;
              }else if(newArray[j]=="Indicator Code"){
              index4=j;
              }else if(newArray[j]==2005){
              index5=j;
              }

         }//for loop
      }//if condition
       else{
             if(newArray[index5]==0){
                   console.log("data set empty....................");
             }else{
               dataObject=new Object();
               dataObject.countryName=newArray[index1];
               dataObject.countryCode=newArray[index2];
               dataObject.indicatorName=newArray[index3];
               dataObject.indicatorCode=newArray[index4];
               dataObject.year=newArray[index5];
               arrayObject.push(dataObject);
               console.log(dataObject.countryName+",  "+dataObject.countryCode+",  "+dataObject.indicatorName+",  "+dataObject.indicatorCode+", "+dataObject.year);
           }//else end
        }//else end

      }//i loop end
   console.log(index1+" "+index2+" "+index3+" "+index4+" "+index5);


////Now i'm going to filter object based on Indicator
    indicatorObjectForPerCapita=new Object();  //object that will contain Per capita
    countryPlusIndicatorObject=new Object();   //for per capita
    countryPlusIndicatorObject.countryName="countryName";        /*  per capita header*/
    countryPlusIndicatorObject.indicatorName="indicatorName";
    filterArrayObject.push(countryPlusIndicatorObject);

    indicatorObjectForConstant=new Object(); //object that will contain constant USA $

    for(var i=0;i<arrayObject.length;i++){
       console.log("inside first loop");
    //  dataObject=new Object();
      dataObject=arrayObject[i];

      if(dataObject.countryName=="India"){
        // filterArrayObject=[],indicatorObject,countryPlusIndicatorObject
         filterCountryName=dataObject.countryName;
          console.log("inside india loop "+dataObject.countryName);
          console.log("hey   "+dataObject.indicatorName);
             if(dataObject.indicatorName=="GDP per capita (constant 2005 US$)"){
                 console.log("inside GDP");
               indicatorObjectForPerCapita.gdp=dataObject.year;                        // per capita code
             }
             if(dataObject.indicatorName=="GNI per capita (constant 2005 US$)"){
                console.log("inside GNI");
               indicatorObjectForPerCapita.gni=dataObject.year;
             }

             if(dataObject.indicatorName=="GDP (constant 2005 US$)"){
                 console.log("inside GDP");
               indicatorObjectForConstant.gdp=dataObject.year;                        //USA Constant code
             }
             if(dataObject.indicatorName=="GNI (constant 2005 US$)"){
                console.log("inside GNI");
               indicatorObjectForConstant.gni=dataObject.year;
             }
       }// india if() end
    }//for loop end
    if(indicatorObjectForPerCapita!=null){
       console.log("inside indicatorObject111 "+indicatorObjectForPerCapita.gdp);
       console.log("inside indicatorObject222 "+indicatorObjectForPerCapita.gni);
        if(indicatorObjectForPerCapita.gdp!=null && indicatorObjectForPerCapita.gni!=null){
           console.log("creating country plus indicator object");
           countryPlusIndicatorObject=new Object();
           countryPlusIndicatorObject.countryName=filterCountryName;
           countryPlusIndicatorObject.indicatorName=indicatorObjectForPerCapita;
           filterArrayObject.push(countryPlusIndicatorObject);           // final array of object

           console.log(countryPlusIndicatorObject.countryName+"  "+countryPlusIndicatorObject.indicatorName.gdp+"  "+countryPlusIndicatorObject.indicatorName.gni);
       }
   }//indicatorObject end
   if(indicatorObjectForConstant!=null){
      console.log("inside indicatorObject111 "+indicatorObjectForConstant.gdp);
      console.log("inside indicatorObject222 "+indicatorObjectForConstant.gni);
       if(indicatorObjectForConstant.gdp!=null && indicatorObjectForConstant.gni!=null){
          console.log("creating country plus indicator object");
          countryPlusIndicatorObject=new Object();
          countryPlusIndicatorObject.countryName=filterCountryName;
          countryPlusIndicatorObject.indicatorName=indicatorObjectForConstant;
          filterArrayObject.push(countryPlusIndicatorObject);           // final array of object
          console.log(countryPlusIndicatorObject.countryName+"  "+countryPlusIndicatorObject.indicatorName.gdp+"  "+countryPlusIndicatorObject.indicatorName.gni);
      }
  }//indicatorObject end
}//end else
});
