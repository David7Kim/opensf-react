function Comments({ placeholder }) {
  return (
    <div className="comments_box">
      <div className="comments_input_line">
        <input type="text" placeholder={placeholder} />
      </div>
      <div className="comments_push_btn_box">
        <button className="comments_btn">입력</button>
      </div>
    </div>
  );
}

export default Comments;
