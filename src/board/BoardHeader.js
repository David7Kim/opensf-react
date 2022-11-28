function BoardHeader({ leftFunc, rightFunc, title, option, className }) {
  return (
    <div className={className}>
      <div className="board_m_prev_btn" onClick={leftFunc}>
        <img src={require("../images/b_back-30.png")} />
      </div>
      <div className="board_m_txt">{title}</div>
      <div className="btn_add_post" onClick={rightFunc}>
        {option === true && <img src={require("../images/b-pencil-24.png")} />}
      </div>
    </div>
  );
}
export default BoardHeader;
