const DefaultError = (ctx)=>{
    ctx.body = {
        msg : "Page Not Found 404"
      }
      ctx.status = 404

}

export {DefaultError}