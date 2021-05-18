function payRequest(){

 if(jQuery("#p_pymnt_useyn").val() == "N" ){

    jQuery("#imp_uid").val("");
    jQuery("#merchant_uid").val( jQuery("#p_ordr_idxx").val());

    var options = {
       url : saveCrsRegUrl,
       type: 'post',
       cache : false,
       dataType: 'json',
       async: false,
       data :jQuery("#slmpFrm").serialize() ,
       success : function(result){
           if( result.chkstr == "S"){
               var f = document.slmpFrm;
               f.action = nextUrl;
               f.mkey.value = "";
               f.submit();
           }  else {
               alert(result.msg ) ;
               return false;
           }
       }
    };
    jQuery("#slmpFrm").ajaxSubmit(options); //submit
    return true;

 }else {
      var payMethod = jQuery('input[name="paymentGroup"]:checked').val(); // 결제방법 코드 (01:가상계좌, 03: 신용카드)

      var param = {
               pg : pg_cd, //웹표준 결제창 지원
               pay_method : payMethod,
               merchant_uid : jQuery("#p_ordr_idxx").val(), //상점에서 관리하시는 고유 주문번호를 전달
               name : jQuery("#pay_crsseq_nm").val(),
               amount : jQuery("#pay_pay_expct").val(), //결제 금액
               //amount: 1004,
               buyer_email : jQuery("#pay_usr_email").val(),
               buyer_name :  jQuery("#pay_usr_nm").val(),
               buyer_tel : jQuery("#pay_phone_num").val(),
               escrow : false ,
               m_redirect_url : _M_REDIRECT_URL
      };

      IMP.request_pay(param, function(rsp) {
          if ( rsp.success ) {

              jQuery("#imp_uid").val(rsp.imp_uid);
              jQuery("#merchant_uid").val(rsp.merchant_uid);

              var options = {
                  url : saveCrsRegUrl,
                  type: 'post',
                  cache : false,
                  dataType: 'json',
                  async: false,
                  data :jQuery("#slmpFrm").serialize() ,
                  success : function(result) {

                        if( result.chkstr == "S"){
                              var f = document.slmpFrm;
                              f.action = nextUrl;
                              f.mkey.value = "";
                              f.submit();
                        } else {
                            alert(result.msg ) ;
                            return false;
                        }
                  }
              };
              jQuery("#slmpFrm").ajaxSubmit(options); //submit
              return true;
          } else {
              var msg = '결제에 실패하였습니다.' + '\n';
              msg += '에러내용 : ' + rsp.error_msg + '\n';
              alert(msg);
              return false;
          }
      });

 }

 return false;
}