import './RulesPanel.css'

export function RulesPanel() {
  return (
    <section className="rules-panel">
      <h2>📖 Cách bet</h2>
      <ol>
        <li>Bấm <strong>Đăng nhập Google</strong> ở góc phải trên.</li>
        <li>Vào tab <strong>Kèo & Trận</strong>. Mỗi trận có dòng kèo vàng, ví dụ <em>"⚖️ Brazil chấp nửa trái"</em> — đội cửa trên phải thắng để ăn kèo.</li>
        <li>Bấm vào 1 trong 2 nút tên đội để bắt kèo — nút chuyển xanh là xong, không cần nhập gì thêm.</li>
        <li>Đổi ý? Bấm đội còn lại để đổi kèo, hoặc <strong>bấm lại đội đang chọn để hủy kèo</strong>. Được sửa thoải mái cho đến giờ khóa.</li>
        <li>Kèo <strong>khóa trước giờ bóng lăn 30 phút</strong> (app hiện "⏳ Khóa lúc..."). Quên không bắt = <strong>bỏ kèo = thua, ăn đủ điểm</strong> 🚫.</li>
        <li>Bấm <strong>"Kèo của mọi người"</strong> dưới mỗi trận để xem ai bắt đội nào. Sau trận, app tự chấm điểm — xem thứ hạng ở tab <strong>🏆 Bảng điểm</strong>.</li>
      </ol>

      <h2>⚖️ Đọc kèo chấp thế nào?</h2>
      <ul>
        <li><strong>Đồng banh:</strong> đội nào thắng thì bên đó ăn kèo, hòa thì cả 2 hòa kèo.</li>
        <li><strong>Chấp ¼ (0-0.5):</strong> hòa trận → bên bắt đội chấp thua nửa, bên kia thắng nửa.</li>
        <li><strong>Chấp nửa trái (0.5):</strong> đội chấp phải thắng; hòa là bên bắt đội chấp thua đủ.</li>
        <li><strong>Chấp 1 trái:</strong> đội chấp thắng đúng 1 bàn → hòa kèo; thắng 2 bàn trở lên mới ăn.</li>
      </ul>

      <h2>📜 Luật tính điểm</h2>
      <ul>
        <li>Thua kèo bị cộng điểm: vòng bảng <strong>+2 điểm</strong> · vòng 1/16 & 1/8 <strong>+4 điểm</strong> · từ tứ kết <strong>+8 điểm</strong>.</li>
        <li>Thua nửa kèo: cộng nửa số điểm (+1/+2/+4 điểm). Thắng, thắng nửa, hòa kèo: <strong>0 điểm</strong>.</li>
        <li>Kèo tính theo kết quả <strong>90 phút</strong> (giống nhà cái), không tính hiệp phụ/luân lưu.</li>
        <li><strong>Càng nhiều điểm càng thua đậm.</strong> Hết World Cup, ai cao điểm nhất chung tiền 💸 (hòa điểm → ai ít lần "an toàn" hơn thua).</li>
        <li>Kết quả trận đấu tự cập nhật. Kèo do admin 👑 cập nhật trước mỗi trận (theo kèo châu Á các nhà cái).</li>
      </ul>
    </section>
  )
}
