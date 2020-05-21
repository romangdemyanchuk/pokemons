export const spliteUrl = (url) => {
    let splitedUrl = url.split('/');
    let id = splitedUrl[splitedUrl.length - 2];
    return (id)
};
export default spliteUrl;