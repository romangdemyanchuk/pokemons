export const spliteUrl = function(url){
    let splitedUrl = url.split('/');
    let id = splitedUrl[splitedUrl.length - 2];
    return id
};