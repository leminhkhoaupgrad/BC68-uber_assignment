const UBER_CAR = "uberCar";
const UBER_SUV = "uberSUV";
const UBER_BLACK = "uberBlack";

const kiemTraGiaTienKmDauTien = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 8000;
    case UBER_SUV:
      return 9000;
    case UBER_BLACK:
      return 10000;
  }
};

const kiemTraGiaTienKmTu1Den19 = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 7500;
    case UBER_SUV:
      return 8500;
    case UBER_BLACK:
      return 9500;
  }
};

const kiemTraGiaTienKmTu19TroLen = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 7000;
    case UBER_SUV:
      return 8000;
    case UBER_BLACK:
      return 9000;
  }
};

const kiemTraGiaTienCho = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR:
      return 2000;
    case UBER_SUV:
      return 3000;
    case UBER_BLACK:
      return 3500;
  }
};

let tongTien = 0;
let giaTienKmDauTien,
  giaTienTu1Den19,
  giaTienKmTu19TroLen,
  giaTienCho,
  soKm,
  thoiGianCho,
  loaiXe;

document.getElementById("btnTinhTien").onclick = () => {
  console.log("Nút tính tiền");

  soKm = document.getElementById("txt-km").value * 1;
  thoiGianCho = document.getElementById("txt-thoiGianCho").value * 1;
  loaiXe = document.querySelector("input[type='radio']:checked").value;

  giaTienKmDauTien = kiemTraGiaTienKmDauTien(loaiXe);
  giaTienTu1Den19 = kiemTraGiaTienKmTu1Den19(loaiXe);
  giaTienKmTu19TroLen = kiemTraGiaTienKmTu19TroLen(loaiXe);
  giaTienCho = kiemTraGiaTienCho(loaiXe);

  tongTien = 0;
  if (soKm <= 1 && soKm > 0) {
    tongTien = soKm * giaTienKmDauTien;
  } else if (soKm > 1 && soKm <= 19) {
    tongTien = giaTienKmDauTien + (soKm - 1) * giaTienTu1Den19;
  } else {
    tongTien =
      giaTienKmDauTien +
      18 * giaTienTu1Den19 +
      (soKm - 19) * giaTienKmTu19TroLen;
  }

  let thoiGianChoPhi = 0;
  if (thoiGianCho > 3) {
    thoiGianChoPhi = Math.floor((thoiGianCho - 3) / 3) * giaTienCho;
  }
  tongTien += thoiGianChoPhi;

  document.getElementById("divThanhTien").style.display = "block";
  document.getElementById("xuatTien").innerHTML = tongTien.toLocaleString(
    "vi",
    {
      currency: "VND",
      style: "currency",
    }
  );
};

document.querySelector("#btnInHoaDon").onclick = () => {
  soKm = document.getElementById("txt-km").value * 1;
  thoiGianCho = document.getElementById("txt-thoiGianCho").value * 1;
  loaiXe = document.querySelector("input[type='radio']:checked").value;

  giaTienKmDauTien = kiemTraGiaTienKmDauTien(loaiXe);
  giaTienTu1Den19 = kiemTraGiaTienKmTu1Den19(loaiXe);
  giaTienKmTu19TroLen = kiemTraGiaTienKmTu19TroLen(loaiXe);
  giaTienCho = kiemTraGiaTienCho(loaiXe);

  tongTien = 0;
  if (soKm <= 1 && soKm > 0) {
    tongTien = soKm * giaTienKmDauTien;
  } else if (soKm > 1 && soKm <= 19) {
    tongTien = giaTienKmDauTien + (soKm - 1) * giaTienTu1Den19;
  } else {
    tongTien =
      giaTienKmDauTien +
      18 * giaTienTu1Den19 +
      (soKm - 19) * giaTienKmTu19TroLen;
  }

  let thoiGianChoPhi = 0;
  if (thoiGianCho > 3) {
    thoiGianChoPhi = Math.floor((thoiGianCho - 3) / 3) * giaTienCho;
  }
  tongTien += thoiGianChoPhi;

  document.querySelector(".modal-title").innerText = "Chi Tiết Hóa Đơn";
  let modalBody = `
    <table class="table">
      <tr>
        <th>CHI TIẾT</th>
        <th>SỬ DỤNG</th>
        <th>ĐƠN GIÁ (1000đ)</th>
        <th>THÀNH TIỀN (1000đ)</th>
      </tr>
      <tr>
        <td>KM ĐẦU TIÊN</td>
        <td>0.8</td>
        <td>${giaTienKmDauTien / 1000}</td>
        <td>${(0.8 * giaTienKmDauTien) / 1000}</td>
      </tr>
      <tr>
        <td>Từ 1 đến 19 km</td>
        <td>${soKm > 1 ? soKm - 1 : 0}</td>
        <td>${giaTienTu1Den19 / 1000}</td>
        <td>${((soKm > 1 ? soKm - 1 : 0) * giaTienTu1Den19) / 1000}</td>
      </tr>
      <tr>
        <td>Từ 19 km trở lên</td>
        <td>${soKm > 19 ? soKm - 19 : 0}</td>
        <td>${giaTienKmTu19TroLen / 1000}</td>
        <td>${((soKm > 19 ? soKm - 19 : 0) * giaTienKmTu19TroLen) / 1000}</td>
      </tr>
      <tr>
        <td>Thời gian chờ</td>
        <td>${thoiGianCho} phút</td>
        <td>${giaTienCho / 1000}</td>
        <td>${thoiGianChoPhi / 1000}</td>
      </tr>
    </table>
    <h4>TỔNG TIỀN: ${tongTien.toLocaleString("vi", {
      currency: "VND",
      style: "currency",
    })}</h4>
  `;
  document.querySelector(".modal-body").innerHTML = modalBody;

  $("#myModal").modal("show");
};
