package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/huaweicloud/huaweicloud-sdk-go-v3/core"
	"github.com/huaweicloud/huaweicloud-sdk-go-v3/core/auth/basic"
	"github.com/huaweicloud/huaweicloud-sdk-go-v3/core/config"
	v22 "github.com/huaweicloud/huaweicloud-sdk-go-v3/services/apig/v2"
	v2 "github.com/huaweicloud/huaweicloud-sdk-go-v3/services/functiongraph/v2"
	"github.com/huaweicloud/huaweicloud-sdk-go-v3/services/functiongraph/v2/model"
	"io/ioutil"
	ApiCore "main/src/core"
	"net/http"
	"strings"
	"time"
)

type ApiSimple struct {
	Name        string `json:"name"`
	Type        int    `json:"type"`
	Version     string `json:"version"`
	ReqProtocol string `json:"req_protocol"`
	ReqMethod   string `json:"req_method"`
	ReqURI      string `json:"req_uri"`
	AuthType    string `json:"auth_type"`
	AuthOpt     struct {
		AppCodeAuthType string `json:"app_code_auth_type"`
	} `json:"auth_opt"`
	Tag                 string        `json:"tag"`
	Cors                bool          `json:"cors"`
	MatchMode           string        `json:"match_mode"`
	BackendType         string        `json:"backend_type"`
	Remark              string        `json:"remark"`
	GroupID             string        `json:"group_id"`
	BodyRemark          string        `json:"body_remark"`
	ResultNormalSample  string        `json:"result_normal_sample"`
	ResultFailureSample string        `json:"result_failure_sample"`
	AuthorizerID        string        `json:"authorizer_id"`
	RomaAppID           string        `json:"roma_app_id"`
	DomainName          string        `json:"domain_name"`
	Tags                []interface{} `json:"tags"`
	ID                  string        `json:"id"`
	Status              int           `json:"status"`
	ArrangeNecessary    int           `json:"arrange_necessary"`
	RegisterTime        time.Time     `json:"register_time"`
	UpdateTime          time.Time     `json:"update_time"`
	GroupName           string        `json:"group_name"`
	RunEnvName          string        `json:"run_env_name"`
	RunEnvID            string        `json:"run_env_id"`
	PublishID           string        `json:"publish_id"`
	RomaAppName         string        `json:"roma_app_name"`
	ReqParams           interface{}   `json:"req_params"`
}
type ApiInfoList struct {
	Total int         `json:"total"`
	Size  int         `json:"size"`
	Apis  []ApiSimple `json:"apis"`
}
type ApiInfo struct {
	Name        string `json:"name"`
	Type        int    `json:"type"`
	Version     string `json:"version"`
	ReqProtocol string `json:"req_protocol"`
	ReqMethod   string `json:"req_method"`
	ReqURI      string `json:"req_uri"`
	AuthType    string `json:"auth_type"`
	AuthOpt     struct {
		AppCodeAuthType string `json:"app_code_auth_type"`
	} `json:"auth_opt"`
	Tag                 string        `json:"tag"`
	Cors                bool          `json:"cors"`
	MatchMode           string        `json:"match_mode"`
	BackendType         string        `json:"backend_type"`
	Remark              string        `json:"remark"`
	GroupID             string        `json:"group_id"`
	BodyRemark          string        `json:"body_remark"`
	ResultNormalSample  string        `json:"result_normal_sample"`
	ResultFailureSample string        `json:"result_failure_sample"`
	AuthorizerID        string        `json:"authorizer_id"`
	RomaAppID           string        `json:"roma_app_id"`
	DomainName          string        `json:"domain_name"`
	Tags                []interface{} `json:"tags"`
	ID                  string        `json:"id"`
	Status              int           `json:"status"`
	ArrangeNecessary    int           `json:"arrange_necessary"`
	RegisterTime        time.Time     `json:"register_time"`
	UpdateTime          time.Time     `json:"update_time"`
	GroupName           string        `json:"group_name"`
	RunEnvName          string        `json:"run_env_name"`
	RunEnvID            string        `json:"run_env_id"`
	PublishID           string        `json:"publish_id"`
	RomaAppName         string        `json:"roma_app_name"`
	BackendAPI          interface{}   `json:"backend_api"`
	MockInfo            interface{}   `json:"mock_info"`
	FuncInfo            struct {
		FunctionUrn    string    `json:"function_urn"`
		InvocationType string    `json:"invocation_type"`
		Timeout        int       `json:"timeout"`
		Version        string    `json:"version"`
		Remark         string    `json:"remark"`
		AuthorizerID   string    `json:"authorizer_id"`
		ID             string    `json:"id"`
		RegisterTime   time.Time `json:"register_time"`
		UpdateTime     time.Time `json:"update_time"`
		Status         int       `json:"status"`
	} `json:"func_info"`
	ReqParams       []interface{} `json:"req_params"`
	BackendParams   []interface{} `json:"backend_params"`
	PolicyHTTPS     interface{}   `json:"policy_https"`
	PolicyFunctions []interface{} `json:"policy_functions"`
	PolicyMocks     interface{}   `json:"policy_mocks"`
}

type ApiGroup struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Status       int       `json:"status"`
	SlDomain     string    `json:"sl_domain"`
	SlDomains    []string  `json:"sl_domains"`
	Remark       string    `json:"remark"`
	RegisterTime time.Time `json:"register_time"`
	UpdateTime   time.Time `json:"update_time"`
	CallLimits   int       `json:"call_limits"`
	TimeInterval int       `json:"time_interval"`
	TimeUnit     string    `json:"time_unit"`
	URLDomains   []struct {
		ID          string `json:"id"`
		Domain      string `json:"domain"`
		CnameStatus int    `json:"cname_status"`
		SslID       string `json:"ssl_id"`
		SslName     string `json:"ssl_name"`
	} `json:"url_domains"`
	OnSellStatus int `json:"on_sell_status"`
	IsDefault    int `json:"is_default"`
}
type ApiGroupResponse struct {
	Total  int        `json:"total"`
	Size   int        `json:"size"`
	Groups []ApiGroup `json:"groups"`
}

type HWConfig struct {
	MongoURL  string `json:"mongoUrl"`
	QiniuAK   string `json:"qiniuAK"`
	QiniuSK   string `json:"qiniuSK"`
	HWAK      string `json:"HWAK"`
	HWSK      string `json:"HWSK"`
	Enpoint   string `json:"Enpoint"`
	ProjectID string `json:"projectId"`
}

func main() {
	fmt.Println("hello")
	conf, err := ioutil.ReadFile("serverless.conf")
	if err != nil {
		fmt.Println("配置文件不存在")
		return

	}
	hwConfig := HWConfig{}
	json.Unmarshal(conf, &hwConfig)

	ak := hwConfig.HWAK
	sk := hwConfig.HWSK
	qiniuSK := hwConfig.QiniuSK
	qiniuAK := hwConfig.QiniuAK
	mongoUrl := hwConfig.MongoURL
	projectId := hwConfig.ProjectID
	enpoint := hwConfig.Enpoint
	if ak == "" {
		fmt.Println("HWAK不能为空")
		return
	}
	if sk == "" {
		fmt.Println("HWSK不能为空")
		return
	}
	if qiniuSK == "" {
		fmt.Println("qiniuSK不能为空")
		return
	}
	if qiniuAK == "" {
		fmt.Println("qiniuAK不能为空")
		return
	}
	if mongoUrl == "" {
		fmt.Println("mongoUrl不能为空")
		return
	}
	if projectId == "" {
		fmt.Println("projectId不能为空")
		return
	}
	if enpoint == "" {
		fmt.Println("enpoint不能为空")
		return
	}
	fmt.Println(hwConfig)
	//return
	functionendpoint := fmt.Sprintf("https://functiongraph.%s.myhuaweicloud.com", enpoint)
	apigEndpoint := fmt.Sprintf("https://apig.%s.myhuaweicloud.com", enpoint)

	dependFileName := "node_modules.zip"
	depenceName := "mongo_dayjs_qiniu"

	envermentNameValue := fmt.Sprintf(`{"qiniuAK":"%s","qiniuSK":"%s","mongodb_url":"%s"}`, qiniuAK, qiniuSK, mongoUrl)

	var fileFunNameMap map[string]string /*创建集合 */
	fileFunNameMap = make(map[string]string)
	fileFunNameMap["code/serverlessCount.js"] = "count"
	fileFunNameMap["code/serverlessDetail.js"] = "detail"
	fileFunNameMap["code/serverlessPin.js"] = "pin"
	fileFunNameMap["code/serverlessQiNiu.js"] = "qiniu"
	fileFunNameMap["code/serverlessSearch.js"] = "search"
	fileFunNameMap["code/serverlessTags.js"] = "tags"
	fileFunNameMap["code/serverlessAdd.js"] = "addNeno"
	fileFunNameMap["code/serverlessDelete.js"] = "delete"
	fileFunNameMap["code/serverlessFind.js"] = "find"
	fileFunNameMap["code/serverlessPins.js"] = "pins"
	fileFunNameMap["code/serverlessRenameTag.js"] = "rename"
	fileFunNameMap["code/serverlessSetting.js"] = "setting"

	apiGroupId := ""
	slDomain := ""
	client, _ := initClient(
		ak,
		sk,
		projectId,
		functionendpoint,
	)

	apigroup, err := GetApiGroup(
		ak,
		sk,
		projectId,
		apigEndpoint)
	if err != nil {
		fmt.Println(err)
		return
	}
	if apigroup.Size != 0 {
		for _, i2 := range apigroup.Groups {
			if i2.Name == "api_group_neno" {
				apiGroupId = i2.ID
				slDomain = i2.SlDomain
				fmt.Println(apiGroupId)
				break
			}
		}
	} else {
		//创建api分组
		apiGroup := CreatApiGroup(
			ak,
			sk,
			projectId,
			apigEndpoint)
		apiGroupId = apiGroup.SlDomain
		slDomain = apiGroup.SlDomain

	}

	listDependenciesRequestDependencyType := model.GetListDependenciesRequestDependencyTypeEnum().PRIVATE
	listDependenciesRequest := model.ListDependenciesRequest{

		DependencyType: &listDependenciesRequestDependencyType,
	}
	//检查依赖包是否已经上传
	alldepence := listDependencies(client, &listDependenciesRequest)
	haveDependence := false
	listDependenciesResult := model.ListDependenciesResult{}
	depenceId := ""
	for _, dependenciesResult := range alldepence {
		if dependenciesResult.Name == depenceName {
			listDependenciesResult = dependenciesResult
			haveDependence = true
		}
	}
	dependFileByte, err := ioutil.ReadFile(dependFileName)
	if err != nil {
		fmt.Println("ReadFile", err)
		return
	}
	dependFileBase64 := base64.StdEncoding.EncodeToString(dependFileByte)
	if haveDependence {
		updateDependencyRequest := model.UpdateDependencyRequest{
			DependId: listDependenciesResult.Id,
			Body: &model.UpdateDependencyRequestBody{
				DependType:  "zip",
				DependFile:  &dependFileBase64,
				Runtime:     model.GetUpdateDependencyRequestBodyRuntimeEnum().NODE_JS_12_13,
				Name:        &depenceName,
				Description: &depenceName,
			},
		}
		depenceId = *(updateDependency(client, &updateDependencyRequest)).Id
	} else {
		dependencyRequest := model.CreateDependencyRequest{
			Body: &model.CreateDependencyRequestBody{
				DependType:  "zip",
				DependFile:  &dependFileBase64,
				Runtime:     model.GetCreateDependencyRequestBodyRuntimeEnum().NODE_JS_12_13,
				Name:        &depenceName,
				Description: &depenceName,
			},
		}
		depenceId = *(createDependencies(client, &dependencyRequest)).Id
	}
	listFunctionsRequest := model.ListFunctionsRequest{}
	funlist := listFunctions(client, &listFunctionsRequest)

	for fileName := range fileFunNameMap {
		fmt.Println(fileName, "---", fileFunNameMap[fileName])

		jsFileBody, err := ioutil.ReadFile(fileName)
		if err != nil {
			fmt.Println(err)
			return
		}
		jsFileBodyBase64 := base64.StdEncoding.EncodeToString(jsFileBody)
		createFunctionRequest := model.CreateFunctionRequest{}
		createFunctionRequestBody := model.CreateFunctionRequestBody{
			FuncName:   fileFunNameMap[fileName],
			Handler:    "index.handler",
			MemorySize: 128,
			Timeout:    10,
			Runtime:    model.GetCreateFunctionRequestBodyRuntimeEnum().NODE_JS12_13,
			Package:    "default",
			CodeType:   model.GetCreateFunctionRequestBodyCodeTypeEnum().INLINE,
			FuncCode:   &model.FuncCode{File: jsFileBodyBase64},
		}

		createFunctionRequest.Body = &createFunctionRequestBody
		re, err := createFunction(client, &createFunctionRequest)
		existFuncUrn := ""

		if re == nil {
			//已存在就要获取这个存在的函数id
			if strings.Contains(fmt.Sprint(err), "FSS.1061") {
				for _, result := range *funlist.Functions {
					if result.FuncName == fileFunNameMap[fileName] {
						existFuncUrn = result.FuncUrn
					}
				}
			}
		} else {
			existFuncUrn = *re.FuncUrn
		}
		updateFunctionCodeRequest := model.UpdateFunctionCodeRequest{
			FunctionUrn: existFuncUrn,
			Body: &model.UpdateFunctionCodeRequestBody{
				CodeType: model.GetUpdateFunctionCodeRequestBodyCodeTypeEnum().INLINE,
				DependList: &[]string{
					depenceId,
				},
				UserData: &envermentNameValue,
				FuncCode: &model.FuncCode{File: jsFileBodyBase64},
			},
		}
		updateFunction(client, &updateFunctionCodeRequest)

		functionConfigRequest := model.UpdateFunctionConfigRequest{
			FunctionUrn: existFuncUrn,
			Body: &model.UpdateFunctionConfigRequestBody{
				Handler:    "index.handler",
				MemorySize: 128,
				Timeout:    20,
				Runtime:    model.GetUpdateFunctionConfigRequestBodyRuntimeEnum().NODE_JS12_13,
				UserData:   &envermentNameValue,
			},
		}
		updateFunctionConfig(client, &functionConfigRequest)
		listFunctionTriggersRequest := model.ListFunctionTriggersRequest{FunctionUrn: existFuncUrn}
		listFunctionTriggersResponse, err := getTrigger(client, &listFunctionTriggersRequest)
		if len(*listFunctionTriggersResponse.Body) == 0 {
			createFunctionTriggerRequestBodyTriggerStatus := model.GetCreateFunctionTriggerRequestBodyTriggerStatusEnum().ACTIVE
			apigEventData := model.APIGEventData{
				GroupID:     apiGroupId,
				Name:        "API_" + fileFunNameMap[fileName],
				Auth:        "NONE",
				Protocol:    "HTTPS",
				Path:        "/" + fileFunNameMap[fileName],
				MatchMode:   "NORMAL",
				ReqMethod:   "POST",
				BackendType: "FUNCTION",
				EnvID:       "DEFAULT_ENVIRONMENT_RELEASE_ID",
				EnvName:     "RELEASE",
				Type:        1,
				SlDomain:    slDomain,
				Cors:        true,
			}
			eventTypeCode := fileFunNameMap[fileName]
			createFunctionTriggerRequest := model.CreateFunctionTriggerRequest{
				FunctionUrn: existFuncUrn,
				Body: &model.CreateFunctionTriggerRequestBody{
					TriggerTypeCode: model.GetCreateFunctionTriggerRequestBodyTriggerTypeCodeEnum().APIG,
					TriggerStatus:   &createFunctionTriggerRequestBodyTriggerStatus,
					EventTypeCode:   &eventTypeCode,
					EventData:       &apigEventData,
				},
			}
			createTrigger(client, &createFunctionTriggerRequest)
		}

	}
	apilist := GetApiList(
		ak,
		sk,
		projectId,
		apigEndpoint)
	for _, i2 := range apilist.Apis {
		info := GetApiDetail(ak,
			sk,
			projectId,
			apigEndpoint, i2.ID)
		info.Cors = true
		info.FuncInfo.Timeout = 20000
		info.MatchMode = "NORMAL"
		UpdateApiDetail(ak,
			sk,
			projectId,
			apigEndpoint, i2.ID, info)
		PublishApi(ak,
			sk,
			projectId,
			apigEndpoint, i2.ID)
	}
	return

}

//func createApiGroup(client *v22.ApigClient) (*model.CreateFunctionTriggerResponse, error) {
//
//}
//给函数创建触发器
func createTrigger(client *v2.FunctionGraphClient, request *model.CreateFunctionTriggerRequest) (*model.CreateFunctionTriggerResponse, error) {
	re, err := client.CreateFunctionTrigger(request)
	if err != nil {
		fmt.Println("createTriggererr", err)
	} else {
		fmt.Println("createTrigger", re.String())

	}
	return re, err
}

//获取函数的触发器列表
func getTrigger(client *v2.FunctionGraphClient, request *model.ListFunctionTriggersRequest) (*model.ListFunctionTriggersResponse, error) {
	re, err := client.ListFunctionTriggers(request)
	if err != nil {
		fmt.Println("getTrigger", err)

	} else {
		fmt.Println("getTrigger", re.String())

	}
	return re, err
}

//更新函数代码
func updateFunction(client *v2.FunctionGraphClient, request *model.UpdateFunctionCodeRequest) {
	re, err := client.UpdateFunctionCode(request)
	if err != nil {
		fmt.Println("updateFunction", err)
	} else {
		fmt.Println("updateFunction", re.String())
	}
}

//更新函数配置
func updateFunctionConfig(client *v2.FunctionGraphClient, request *model.UpdateFunctionConfigRequest) {
	re, err := client.UpdateFunctionConfig(request)
	if err != nil {
		fmt.Println("updateFunctionConfig", err)
	} else {
		fmt.Println("updateFunctionConfig", re.String())
	}
}

//获取依赖列表
func listDependencies(client *v2.FunctionGraphClient, request *model.ListDependenciesRequest) []model.ListDependenciesResult {
	re, err := client.ListDependencies(request)
	if err != nil {
		fmt.Println("listDependencies", err)

	} else {
		fmt.Println("listDependencies", re.String())
		return *re.Dependencies
	}

	return nil
}

//创建依赖包
func createDependencies(client *v2.FunctionGraphClient, request *model.CreateDependencyRequest) *model.CreateDependencyResponse {
	re, err := client.CreateDependency(request)
	if err != nil {
		fmt.Println("createDependencies", err)
	} else {

		fmt.Println("createDependencies", re.String())
		return re
	}
	return nil
}

//更新依赖包
func updateDependency(client *v2.FunctionGraphClient, request *model.UpdateDependencyRequest) *model.UpdateDependencyResponse {
	re, err := client.UpdateDependency(request)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("updateDependency", re.String())
		return re
	}
	return nil
}

/*获取函数列表*/
func listFunctions(client *v2.FunctionGraphClient, request *model.ListFunctionsRequest) *model.ListFunctionsResponse {
	re, err := client.ListFunctions(request)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("listFunctions", re.String())
		return re
	}
	return nil
}

/*添加一个函数*/
func createFunction(client *v2.FunctionGraphClient, request *model.CreateFunctionRequest) (*model.CreateFunctionResponse, error) {
	re, err := client.CreateFunction(request)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("createFunction", re.String())
	}
	return re, err

}

/*获得api分组的列表*/
func GetApiGroup(ak string, sk string, projectId string, endpoint string, ) (ApiGroupResponse, error) {
	s := ApiCore.Signer{
		Key:    ak,
		Secret: sk,
	}
	r, _ := http.NewRequest("GET", fmt.Sprintf("%s/v1.0/apigw/api-groups", endpoint), nil)

	//r.Header.Add("content-type", "application/json")
	s.Sign(r)
	client := http.DefaultClient
	resp, err := client.Do(r)
	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	var apiGroupResponse ApiGroupResponse
	json.Unmarshal(body, &apiGroupResponse)
	if strings.Contains(string(body), "APIGW.0301") {
		return apiGroupResponse, fmt.Errorf("AK/SK不对")
	}
	return apiGroupResponse, nil
}

/*获得api分组的列表*/
func CreatApiGroup(ak string, sk string, projectId string, endpoint string, ) ApiGroup {
	s := ApiCore.Signer{
		Key:    ak,
		Secret: sk,
	}
	r, _ := http.NewRequest("POST", fmt.Sprintf("%s/v1.0/apigw/api-groups", endpoint), ioutil.NopCloser(bytes.NewBuffer([]byte(`{	"name": "api_group_neno"}`))))

	//r.Header.Add("content-type", "application/json")
	s.Sign(r)
	client := http.DefaultClient
	resp, err := client.Do(r)
	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()
	var apiGroup ApiGroup
	body, err := ioutil.ReadAll(resp.Body)

	if resp.StatusCode == 201 {

		if err != nil {
			fmt.Println(err)
		}
		json.Unmarshal(body, &apiGroup)
		fmt.Println(apiGroup)
	}
	return apiGroup

}

/*获得api的列表*/
func GetApiList(ak string, sk string, projectId string, endpoint string, ) ApiInfoList {

	s := ApiCore.Signer{
		Key:    ak,
		Secret: sk,
	}
	r, _ := http.NewRequest("GET", fmt.Sprintf("%s/v1.0/apigw/apis", endpoint), nil)

	s.Sign(r)

	client := http.DefaultClient
	resp, err := client.Do(r)
	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()
	var apiInfoList ApiInfoList
	body, err := ioutil.ReadAll(resp.Body)

	if resp.StatusCode == 200 {

		if err != nil {
			fmt.Println(err)
		}
		json.Unmarshal(body, &apiInfoList)
	}
	return apiInfoList
}

/*获得api的信息*/
func GetApiDetail(ak string, sk string, projectId string, endpoint string, apiId string) ApiInfo {

	s := ApiCore.Signer{
		Key:    ak,
		Secret: sk,
	}
	r, _ := http.NewRequest("GET", fmt.Sprintf("%s/v1.0/apigw/apis/%s", endpoint, apiId), nil)

	//r.Header.Add("content-type", "application/json")
	s.Sign(r)

	client := http.DefaultClient

	resp, err := client.Do(r)
	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()
	var apiInfo ApiInfo
	body, err := ioutil.ReadAll(resp.Body)

	if resp.StatusCode == 200 {

		if err != nil {
			fmt.Println(err)
		}
		json.Unmarshal(body, &apiInfo)
		fmt.Println(apiInfo)
	}
	return apiInfo
}

/*更新api*/
func UpdateApiDetail(ak string, sk string, projectId string, endpoint string, apiId string, updateapiinfo ApiInfo) ApiInfo {
	s := ApiCore.Signer{
		Key:    ak,
		Secret: sk,
	}
	body, err := json.Marshal(updateapiinfo)
	r, _ := http.NewRequest("PUT", fmt.Sprintf("%s/v1.0/apigw/apis/%s", endpoint, apiId), ioutil.NopCloser(bytes.NewBuffer(body)))

	//r.Header.Add("content-type", "application/json")
	s.Sign(r)
	client := http.DefaultClient

	resp, err := client.Do(r)
	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()
	var apiInfo ApiInfo
	body, err = ioutil.ReadAll(resp.Body)

	if resp.StatusCode == 200 {

		if err != nil {
			fmt.Println(err)
		}
		json.Unmarshal(body, &apiInfo)
		fmt.Println(apiInfo)
	}
	return apiInfo
}

/*发布api*/
func PublishApi(ak string, sk string, projectId string, endpoint string, apiId string) {
	s := ApiCore.Signer{
		Key:    ak,
		Secret: sk,
	}
	r, _ := http.NewRequest("POST", fmt.Sprintf("%s/v1.0/apigw/apis/publish/%s", endpoint, apiId), ioutil.NopCloser(bytes.NewBuffer([]byte(`{
 "env_id": "DEFAULT_ENVIRONMENT_RELEASE_ID"
}`))))

	//r.Header.Add("content-type", "application/json")
	s.Sign(r)
	client := http.DefaultClient

	resp, err := client.Do(r)
	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()

	if resp.StatusCode == 200 {

		if err != nil {
			fmt.Println(err)
		}
	}
}
func initClient(ak string, sk string, projectId string, endpoint string, ) (*v2.FunctionGraphClient, *core.HcHttpClient) {

	auth := basic.NewCredentialsBuilder().
		WithAk(ak).
		WithSk(sk).
		WithProjectId(projectId).
		Build()
	builder := v2.FunctionGraphClientBuilder()
	httpConfig := config.DefaultHttpConfig()

	client := v2.NewFunctionGraphClient(builder.WithCredential(auth).WithEndpoint(endpoint).WithHttpConfig(httpConfig).Build())

	client2 := v22.ApigClientBuilder().WithCredential(auth).WithEndpoint(endpoint).WithHttpConfig(httpConfig).Build()
	return client, client2
}
