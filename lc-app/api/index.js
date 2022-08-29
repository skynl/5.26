// 只有这里用axios
// 导出所有方法

// 引入axious
import Qs from 'qs'
import Axios from 'axios'
// 设置公共路径
Axios.defaults.baseURL = 'http://159.75.89.136:3000'
// 引入序列化方法
// import Qs from 'qs'
export default {
    async getBannerData(){
        let result = await Axios.get('/api_banner',{
            params : {bannerId:1}
        })
        if(result.data.code != 0){
            console.log(result);
            return;
        }
        return result.data.data;
    },
    // 获取大分类数据
    async getCatData(){
        // 发起Ajax请求
        let res = await Axios.get('/api_cat');
        if(res.data.code!=0){
            console.log(res);
            return;
        }
        console.log('我是API方法');
        console.log(res);
        return res.data.data;
    },
    // 获取首页商品数据
    // async getGoodData(cat_id){
    //     let res = await Axios.get('/api_goods?catId='+cat_id+'&pagesize=4&page=1');
    //     if(res.data.code!=0){
    //         console.log(res);
    //         return;
    //     }
    //     console.log('我是API_Good方法');
    //     return res.data.data;
    // },
    // 获取小分类数据
    async getClassifyListData(){
        let res = await Axios.get('/api_classify');
        if(res.data.code!=0){
            console.log(res);
            return;
        }
        console.log(res);
        console.log('我是API_小分类方法')
        return res.data.data;
    },
    // 获取商品数据
    async getGoodsData({page = 1,pagesize = 9,goodsId = null,catId = null} = {}){
        let res = await Axios.get('/api_goods',{
            params:{
                page : page,
                pagesize : pagesize,
                catId : catId,
                goodsId : goodsId
            }
        })
        if(res.data.code != 0 ){
            console.log(res)
            return;
        }
        console.log('我是API_Goods方法');
        return res.data.data;
    },
    // 登录，注册验证
    async getUserData(obj={}){
        let res = await Axios.post('/api_user',Qs.stringify(obj))
        console.log(obj);
        return res.data
    },
    // 搜索
    async getSearchData({page = 1,pagesize = 8,keywords = ''}){
        let res = await Axios.get('/api_search',{
            params:{
                page:page,
                pagesize:pagesize,
                keywords : keywords
            }
        })
        console.log(res)
        return res.data
    },
    // 购物车
    async getCartData(obj={}){
        let res = await Axios.post('/api_cart',Qs.stringify(obj));
        if(res.data.code != 0){
			console.log(res);
			return;
		}
        console.log(res.data)
        return res.data;
    }
}   