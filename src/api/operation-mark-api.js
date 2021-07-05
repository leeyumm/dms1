
const OPERATION_MARK_API = {
  //1.获取某一场手术的全部标记信息 ?operationnumber=1
  getAllMarkInfos:{
    method:'get',
    url:'platform/operation/mark/get_mark_event_list'
  },
  //2.删除一条标记 body{markId:1}
  delOneMarkInfo:{
    method:'delete',
    url:'platform/operation/mark/delete'
  },
  //3.添加一条标记
  addOneMarkInfo:{
    method:'post',
    url:'platform/operation/mark/add'
  },
  //4.修改一条记录
  editOneMarkInfo:{
    method:'post',
    url:'platform/operation/mark/upate'
  }
}

export default OPERATION_MARK_API