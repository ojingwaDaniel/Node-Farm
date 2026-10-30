module.exports = (temp, productData) => {
    let output = temp.replace(/{%id%}/g, productData.slug);
    output = output.replace(/{%product-name%}/g, productData.productName);
    output = output.replace(/{%image%}/g, productData.image);
    output = output.replace(/{%from%}/g, productData.from);
    output = output.replace(/{%nutrients%}/g, productData.nutrients);
    output = output.replace(/{%quantity%}/g, productData.quantity);
    output = output.replace(/{%price%}/g, productData.price);
    output = output.replace(/{%description%}/g, productData.description);
    if (!productData.organic) {
        output = output.replace(/{%notOrganic%}/g, "not-organic");
    } else {
        output = output.replace(/{%notOrganic%}/g, "");
    }
    return output;

}
    