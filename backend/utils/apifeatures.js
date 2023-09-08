const { json } = require("express");

class ApiFeatures {
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }

    // searching for keyword given by user...
    search(){
        const keyword=this.querystr.keyword
        ?{
            name:{
                $regex: this.querystr.keyword,
                $options: "i"   // we are incensible here means ... if user search in capital letters then they also take it as small letters..
            },
        }
        :{};

        console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        let queryCopy={...this.querystr};
        
          //before removing fields..
          console.log(queryCopy);
         let removefiels=["keyword","page","limit"];
         removefiels.forEach(ele => {
            delete queryCopy[ele];
        });
         
        //after removing fiels.. && before converting
        console.log(queryCopy);

        let querystr=JSON.stringify(queryCopy);
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);   // we are converting gt=> $gt this supporrts during searching in mongo..
        
        // after converting...
        console.log(JSON.parse(querystr));



        this.query=this.query.find(JSON.parse(querystr));
        return this;

    }



    //function to which and how many elements to show on screen...
    pagination(resultperpage){
        const currpage=Number(this.querystr.page)|| 1;

        const skip=resultperpage*(currpage-1);

        this.query=this.query.limit(resultperpage).skip(skip);

        return this;
    }
}


module.exports=ApiFeatures;