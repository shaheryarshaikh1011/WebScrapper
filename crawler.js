const puppeteer = require('puppeteer');
exports.crawler = async function(url)
{
    var obj={}
    const browser = await puppeteer.launch({})
     const page = await browser.newPage()
     await page.setDefaultNavigationTimeout(0);
     await page.goto(url, {
    waitUntil: 'load',  // <-- good practice to wait for page to fully load 
  });

     
     
     var product = await page.waitForSelector("#productTitle")
     var productText = await page.evaluate(product => product.textContent, product)
     var price = await page.waitForSelector(".a-price-whole")
     var priceText = await page.evaluate(price => price.textContent, price)

     const tabledata = await page.evaluate(() => {
        const tableBody = document.querySelectorAll('#productDetails_techSpec_section_1 tbody td');
        return Array.from(tableBody).map(element => element.innerText);
    });
    
    var units=tabledata[0];
    var ingredients=tabledata[8]
    
    var productDescription=await page.waitForSelector("#productDescription_feature_div>#productDescription>p>span")
    var descriptionText=await page.evaluate(productDescription=>productDescription.textContent,productDescription)
    const dummyTable = await page.evaluate(() => {
        const tableBody = document.querySelectorAll('.a-normal tbody td');
        return Array.from(tableBody).map(element => element.innerText);
    });
    var dietText=dummyTable[3];
    const image = await page.evaluate(() => {
        const getImage = document.querySelector("#imgTagWrapperId>img").getAttribute("src");
        return getImage;
      });

	var newProduct=({product:productText.trim(),size:units,price:priceText,ingredients:ingredients,description:descriptionText,images:image,diet:dietText})
    return newProduct
	
	 
      
     browser.close()
}


 
 