var fs=require('fs');
var readline=require('readline');
var rd=readline.createInterface({
    input: fs.createReadStream('dataFiles/WDI_Data.csv'),
    output: process.stdout,
    terminal:false
});
var newArray;
var flag=true;
var index1,index2,index3,index4,index5;
//var lineArray,countryArray,countryName=null;
var gdp=0,gni=0,sortingFlag=0;
var gdpGniObject, finalObject,finalArray=[];
var countryArray=[];
var lineArray,splitArray;
rd.on('line',function(line){
    newArray=line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if(flag==true){
      for(var i=0;i<newArray.length;i++){
        if(newArray[i]=="Country Name"){
        index1=i;
      }else if(newArray[i]=="Country Code"){
        index2=i;
      }else if(newArray[i]=="Indicator Name"){
        index3=i;
      }else if(newArray[i]=="Indicator Code"){
        index4=i;
      }else if(newArray[i]==2005){
        index5=i;
      }
    }//end loop
      countryFunction();
      flag=false;
      console.log(flag);
  }//  end if true condition
  else{

      if(newArray[index3]=="GDP per capita (constant 2005 US$)"){
        for(var i=0;i<countryArray.length;i++){
          if(newArray[index1]==countryArray[i]){
             gdp=newArray[index5];
          }
        }//for loop
      }else if(newArray[index3]=="GNI per capita (constant 2005 US$)"){
        for(var i=0;i<countryArray.length;i++){
          if(newArray[index1]==countryArray[i]){
              gni=newArray[index5];
          }
        }//for loop
      }// else if

      if(gdp!=0 && gni!=0){
         gdpGniObject=new Object();
         gdpGniObject.countryName=newArray[index1];
         gdpGniObject.gdp=parseFloat(gdp);
         gdpGniObject.gni=parseFloat(gni);

         finalObject=new Object();
        // finalObject.countryName=newArray[index1];
        // finalObject.indicatorName=gdpGniObject;
        // console.log(finalObject.countryName+"  "+finalObject.indicatorName.gdp+"   "+finalObject.indicatorName.gni);
         finalArray.push(gdpGniObject);
         gdp=0;
         gni=0;

         }

   }   //end main else condition

});
rd.on('close',function(){
     bubbleSort(finalArray,'gdp')
     function bubbleSort(a, par)
      {
      var swapped;
      do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i][par] < a[i + 1][par]) {
                var temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }
      } while (swapped);
    }
   console.log(finalArray);
   var finalData= finalArray.slice(0,15);
   fs.writeFile('jsonFiles/GDP_Top15_Country2.json',JSON.stringify(finalData,null, 2));

});

var countryFunction=function(){
fs.readFile('dataFiles/Countries-Continents-csv.csv',function(err,data){
  if(err){
    console.log(err);
  }else{
     lineArray=data.toString().split("\n");
     for(var i=0;i<lineArray.length;i++){
        splitArray=lineArray[i].toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        countryArray[i]=splitArray[1];
        console.log(i);
    }//end loop
  //  console.log(countryArray);
  }//end else
});
};
