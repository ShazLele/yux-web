/**
 * Created by akon on 2016/11/23.
 */
const fs = require('fs');
fs.rename('../public/temp/images/article/58329b9d204a032454350ae0',
    '../public/images/article/5832a829c265b92210625e5522',
    function (err) {
        console.log(err);
    });