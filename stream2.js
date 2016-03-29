var fs=require("fs");
readline=require('readline');

var rd=readline.createInterface({
  input: fs.createReadStream('WDI_Data.csv'),
  output:process.stdout,
  terminal: false
});
var flag=true;
var growth
var arrayOfGrowth,arr,newArray,arrayObject=[],filterArrayObject=[];
var dataObject,indicatorObjectForPerCapita,indicatorObjectForConstant,countryPlusIndicatorObject,filterCountryName;
var count=0,index1,index2,index3,index4,index5,countryName,countryCode,indicatorName,indicatorCode,year;

dataObject=new Object();
dataObject.countryName="Country Name";
dataObject.countryCode="Country Code";
dataObject.indicatorName="Indicator Name";
dataObject.indicatorCode="Indicator Code";
arrayObject.push(dataObject);
var indexStart,indexEnd;
rd.on('line',function(line){

       newArray=line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);    //((?<=,)|(?=,))
       if(flag==true){
          indexStart=line.toString().split(',').indexOf('1960');
          indexEnd=line.toString().split(',').indexOf('2015');
          console.log("inside true  "+indexStart+"   "+indexEnd);
          for(var j=0;j<newArray.length;j++){
              if(newArray[j]=="Country Name"){
              index1=j;
              }else if(newArray[j]=="Country Code"){
              index2=j;
              }else if(newArray[j]=="Indicator Name"){
              index3=j;
              }else if(newArray[j]=="Indicator Code"){
              index4=j;
            }
            }//for loop
         flag=false;
         console.log(flag);
      }//if condition
       else{
            if(newArray[index1]=="India"){
                 if(newArray[index3]=="GDP growth (annual %)"){
                    arrayOfGrowth=[];
                  // growth=new Object();
                      for (var k = indexStart,i=0; k <=indexEnd; k++,i++) {
                        if(newArray[k]==0){
                          newArray[k]=0;
                        }
                        growth=new Object();
                        growth.year=1960+i;
                        growth.yearGrowth=newArray[k];
                        arrayOfGrowth.push(growth);

                      }// end loop
                    }

                }//end if

           }//else end
});

rd.on('close',function(){
   fs.writeFile('indiaGrowth.json',JSON.stringify(arrayOfGrowth,null,2));
});
