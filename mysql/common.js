/**
 * Created by Stone on 2017/1/22.
 */

let parseWhere = (info, sp) => {
    if (typeof info == 'string')
        return info;
    let where = [];
    for (var col in info) {
        if (typeof info[col] !== 'number' || typeof info[col] !== 'boolean')
            where.push(`\`${col}\`="${info[col]}"`);
        else
            where.push(`\`${col}\`=${info[col]}`);
    }

    return where.length > 0 ? where.join(sp || ' and ') : null;
};
let parseInfo = (info) => {
    return parseWhere(info, ',');
}
let parseSelectString = (query, condition) => {
    let {fields, where, sort, info} = condition;
//查找的列
    !fields && (fields = '*');
    query = query.replace('[fields]', fields);
//条件
    !where && (where = {});
    query = query.replace('[where]', parseWhere(where));
//更新列
    !info && (info = {});
    query = query.replace('[info]', parseInfo(info));
//排序
    !sort && (sort = 'id desc');
    query = query.replace('[sort]', sort);
    console.log(query);
    return query;
};


module.exports = {parseWhere, parseSelectString};