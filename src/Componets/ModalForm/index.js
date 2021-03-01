/*
 * react hook import 
 */
import { useState, useEffect } from "react";
/*
 *  import ant components
 */
import { Modal, Input } from "antd";
/*
 *
 */
const ModalForm = ({ isOpen = true, getNickname }) => {
  const [nickname, setNickname] = useState("");
  /**
   *
   * @param {*} evt
   */
  const handlerNicknameField = (evt) => {
    setNickname(evt.target.value);
  };
  /*
   *
   */
  useEffect(() => {
    /*  console.log("useEffect", nickname);*/
  }, [nickname]);
  /*
   *
   */
  return (
    <Modal
      title="Inserisci il nome che userai in chat"
      visible={isOpen}
      onOk={() => getNickname(nickname)}
      onCancel={() => setNickname("")}
      okButtonProps={{ disabled: nickname.length > 3 ? false : true }}
      cancelButtonProps={{ disabled: nickname.length === 0 ? true : false }}
      closable={false}
    >
      <Input
        onChange={handlerNicknameField}
        value={nickname}
        placeholder="nickname"
      />
    </Modal>
  );
};
export default ModalForm;
