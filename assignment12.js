
var roi = ee.FeatureCollection("users/asultanatumpa71/BGD_adm3");

var upazila= roi.filter(ee.Filter.eq("NAME_3","Fatikchhari"))
Map.addLayer(upazila ,{}, "Fatikchhari")
Map.centerObject(upazila)
var s2= ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
.filterBounds(upazila)
.filterDate("2022-01-01" ,"2022-01-30")
            
var addNDVI =function(image){
  var img = image.select("SR_B5" , "SR_B4")
  var NDVI= img.normalizedDifference(["SR_B5" , "SR_B4"]).rename("NDVI")
return image.addBands(NDVI)
  
}

var collectionNDVI = s2.map(addNDVI).mean()
Map.addLayer(collectionNDVI.clip(upazila))

var NoVegetationDensityarea = collectionNDVI.select('NDVI').gte(-0.1).and(collectionNDVI.select('NDVI').lt(0))
var SlightlyDensityVegetationarea = collectionNDVI.select('NDVI').gte(0.02).and(collectionNDVI.select('NDVI').lt(0.03))
var ModeratelyDensityVegetationarea = collectionNDVI.select('NDVI').gte(0.41).and(collectionNDVI.select('NDVI').lt(0.6))
var HighlyDensityVegetationarea = collectionNDVI.select('NDVI').gte(0.61).and(collectionNDVI.select('NDVI').lt(2))

var area1 = NoVegetationDensityarea.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: upazila,
  scale: 10,
  
});

var area2 = SlightlyDensityVegetationarea.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry:upazila,
  scale: 10,
 
});


var area3 = ModeratelyDensityVegetationarea.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: upazila,
  scale: 10,
  
})


var area4 = HighlyDensityVegetationarea.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: upazila,
  scale: 10,
  
})

print('No vegetation density area :', area1.get('NDVI'))
print('Slightly density vegetation area :', area2.get('NDVI'))
print('Modrately density vegetation area :', area3.get('NDVI'))
print('Highly density vegetation area :', area4.get('NDVI'))
