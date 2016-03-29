var fs=require('fs');
var readline=require('readline');
var rd=readline.createInterface({
    input: fs.createReadStream('WDI_Data.csv'),
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
         gdpGniObject.gdp=gdp;
         gdpGniObject.gni=gni;

         finalObject=new Object();
         finalObject.countryName=newArray[index1];
         finalObject.indicatorName=gdpGniObject;
        // console.log(finalObject.countryName+"  "+finalObject.indicatorName.gdp+"   "+finalObject.indicatorName.gni);
         finalArray.push(finalObject);
         gdp=0;
         gni=0;

         }

   }   //end main else condition

});
rd.on('close',function(){

     var len=finalArray.length;
     var obj1,obj2;
     if(len>1){
       for(var i=0; i < len; i++){
          for(var j=1; j < (len-i); j++){
             obj1=new Object();
             obj2=new Object();
             obj1=finalArray[j-1];
             obj2=finalArray[j]
             //console.log(obj1.indicatorName.gdp+"      "+obj2.indicatorName.gdp);
                  if(obj1.indicatorName.gdp < obj2.indicatorName.gdp){
                               var temp = obj1.indicatorName.gdp;
                                obj1.indicatorName.gdp = obj2.indicatorName.gdp;
                                obj2.indicatorName.gdp = temp;
                        }

                }
        }
     }

   var finalData= finalArray.slice(0,15);
   fs.writeFile('gdpGniPart2.json',JSON.stringify(finalData,null, 2));

});

var countryFunction=function(){
fs.readFile('Countries-Continents-csv.csv',function(err,data){
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
