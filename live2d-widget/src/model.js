import showMessage from"./message.js";import randomSelection from"./utils.js";class Model{constructor(e){let{apiPath:t,cdnPath:s}=e,o=!1;if("string"==typeof s)o=!0,s.endsWith("/")||(s+="/");else{if("string"!=typeof t)throw"Invalid initWidget argument!";t.endsWith("/")||(t+="/")}this.useCDN=o,this.apiPath=t,this.cdnPath=s}async loadModelList(){const e=await fetch(`${this.cdnPath}model_list.json`);this.modelList=await e.json()}async loadModel(e,t,s){if(localStorage.setItem("modelId",e),localStorage.setItem("modelTexturesId",t),showMessage(s,4e3,10),this.useCDN){this.modelList||await this.loadModelList();const t=randomSelection(this.modelList.models[e]);loadlive2d("live2d",`${this.cdnPath}model/${t}/index.json`)}else loadlive2d("live2d",`${this.apiPath}get/?id=${e}-${t}`),console.log(`Live2D 模型 ${e}-${t} 加载完成`)}async loadRandModel(){const e=localStorage.getItem("modelId"),t=localStorage.getItem("modelTexturesId");if(this.useCDN){this.modelList||await this.loadModelList();const t=randomSelection(this.modelList.models[e]);loadlive2d("live2d",`${this.cdnPath}model/${t}/index.json`),showMessage("我的新衣服好看嘛？",4e3,10)}else fetch(`${this.apiPath}rand_textures/?id=${e}-${t}`).then((e=>e.json())).then((s=>{1!==s.textures.id||1!==t&&0!==t?this.loadModel(e,s.textures.id,"我的新衣服好看嘛？"):showMessage("我还没有其他衣服呢！",4e3,10)}))}async loadOtherModel(){let e=localStorage.getItem("modelId");if(this.useCDN){this.modelList||await this.loadModelList();const t=++e>=this.modelList.models.length?0:e;this.loadModel(t,0,this.modelList.messages[t])}else fetch(`${this.apiPath}switch/?id=${e}`).then((e=>e.json())).then((e=>{this.loadModel(e.model.id,0,e.model.message)}))}}export default Model;