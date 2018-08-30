SUtility = {}

//https://stackoverflow.com/a/15762329/3021331
SUtility.remove_item = function (arr, value) {
    var b = '';
    for (b in arr) {
        if (arr[b] === value) {
            arr.splice(b, 1);
            break;
        }
    }
    return arr;
}

//https://stackoverflow.com/a/15106541
SUtility.randomPropertyName = function (obj) {
    var keys = Object.keys(obj)
    return keys[ keys.length * Math.random() << 0];
};
