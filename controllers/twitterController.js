import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const Bearer = process.env.Bearer;
// let url = '/hashtag/:tag'
let valTag = /^[^ !@#$%^&*(),.?":{}|<>]{2,20}$/;

export const hashtagSearch = async (ctx) => {
  let reqTAG = ctx.request.URL.pathname.split("/");
  // console.log(reqTAG);
  const requestTAG = reqTAG[2];
  // console.log(requestTAG);

  if (!requestTAG.match(valTag)) {
    const err = {
      message: "HashTag is incorrect",
      success: false,
    };
    ctx.body = err;
  } else if (requestTAG.match(valTag)) {
    const hashtag = ctx.params.tag;
    const config = {
      headers: {
        Authorization: `Bearer ${Bearer}`,
      },
    };

    const ans = await axios.get(
      `https://api.twitter.com/2/tweets/search/recent?query=%23${hashtag}&max_results=15&tweet.fields=created_at&expansions=author_id,attachments.media_keys&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width,alt_text`,
      config
    );

    const data = ans.data;
    // console.log(data);

    if (data.meta.result_count == 0) {
      ctx.body = {
        message: "Data is Not Found",
      };
    } else {
      let tweetArray = []
      for(let i = 0;i<5;i++){
        const username = data.includes.users[i].username;
      console.log(username);
      const { text: caption, created_at: date } = data.data[i];
      const details = { username, date, caption };

      let media_URL = "";
      let URL = "";
      if (data.data[i].attachments) {
        media_URL = data.data[i].attachments.media_keys[i];
        // console.log(media_URL);
        data.includes.media.forEach((ele) => {
          if (ele.url && ele.media_key === media_URL) {
            URL = ele.url.split(",");
          } else if (ele.preview_image_url && ele.media_key === media_URL) {
            URL = ele.preview_image_url.split(",");
          }
        });
      }
      URL.length > 0 ? (details["url"] = URL) : null;
        tweetArray.push(details)
      }
      ctx.body = { success: true, tweetArray };
      
    }
  }
};
//  export {ans} 

