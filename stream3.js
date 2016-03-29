var fs=require('fs');
var readline=require('readline');

var rd1=readline.createInterface({
  input: fs.createReadStream('WDI_Data.csv'),
  output:process.stdout,
  terminal: false
});

var rd2=readline.createInterface({
  input: fs.createReadStream('Countries-Continents-csv.csv'),
  output:process.stdout,
  terminal:false
});

var flag=true;
var index1,index2,index3,index4;
var continent=null,sum=0;
var arrayOfObject=[],finalObject;
rd1.on('line',function(line){
       newArray=line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
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
             if(newArray[index3]=="GDP per capita (constant 2005 US$)"){
                 filterdata(newArray[index1]);
                 if(continent==null){

                 }else{
                   console.log(continent);
                   for(var k=indexStart;k<indexEnd+1;k++){
                     if(newArray[k]==0){
                       newArray[k]=0;
                     }
                      sum=sum+newArray[k];
                      console.log(sum);
                 }//end loop
                 if(arrayOfObject.length==0){
                   finalObject=new Object();
                   finalObject.continent=continent;
                   finalObject.sum=sum;
                   arrayOfObject.push(finalObject);
                 }else{
                /*   finalObject=new Object();
                   for(var i=0;i<arrayOfObject.length;i++){
                      finalObject=arrayOfObject[i];
                     if(finalObject.continent==continent){
                       finalObject.sum=finalObject.sum+sum;
                     }else{
                       finalObject.continent=continent;
                       finalObject.sum=sum;
                     }
                     arrayOfObject.push(finalObject);
                   }//end loop
                 }//else*/
              }//final else end
             }

      }
});
var lineArray,continentCountryArray;
var filterdata=function(country){

  fs.readFile('Countries-Continents-csv.csv',function(err,data){
    if(err){
      console.log(err);
    }else{
       lineArray=data.toString().split("\n");
       for(var i=0;i<lineArray.length;i++){
         continentCountryArray=lineArray[i].toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          if(continentCountryArray[1]==country){
          //  console.log("matched");
            continent=continentCountryArray[0];
          }//end if
      }//end loop
    }//end else
}); //end fs function

};
