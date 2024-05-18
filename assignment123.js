// Make a Normalized Difference Moisture Index (NDMI) map of your upazila by using Landsat 9 imagery for 2023. Upload the code, code link, and screenshot in your github repo. Submit the repo link.

var upazila = roi.filter(ee.Filter.eq("NAME_3","Fatikchhari"))
Map.addLayer(upazila ,{}, "Fatikchhari")
Map.centerObject(upazila)
var s2= ee.ImageCollection("LANDSAT/LC09/C02/T1_L2").filterBounds(upazila).
filterDate("2022-01-01" ,"2022-01-30")
            .mean().clip(upazila)
            Map.addLayer(s2 ,{},"RGB image")
            print(s2)
            
var NDMI= s2.normalizedDifference(["SR_B5" , "SR_B6"]).rename("NDMI")
print(NDMI , "NDMI image")
var vizParam={
  min :-1 ,
  max:+1,
  palette:["red","blue","yellow"]
}
Map.addLayer(NDMI,vizParam,"NDMI Image")


