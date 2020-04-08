INSERT INTO Users (username, pin, created_date) VALUES ("enoumy", "123", date('now'));
INSERT INTO Users (username, pin, created_date) VALUES ("mennis", "324", date('now'));
INSERT INTO Users (username, pin, created_date) VALUES ("farlan", "534", date('now'));

INSERT INTO Blueprints (b_id, blueprint_string, title) VALUES (1, "0eJy1m92OojAYhu+lx5DYUrB6uLcx2Uz8adwmWAw/kzHGe18UmMxuwAlveY+MIPLY9+PpR4k3sc8beymdr8X2Jtyh8JXYvt1E5U5+lz+21deLFVvhansWkfC78+Odze2hLt0hPjvv/Ck+li7PxT0Szh/tp9jKexT8Her+OxLW1652toN6eWAkLkXVfrbwjzO2x8cyjcT18bpqv/Toyvao514V/QfU/mrf7WzPc7s/N9Rlkb/v7Z/dhyvKbuuT5frum/Pelv1vnIskx5GyZZAUgGTGiVbLECUAETc2jcRGTS2dT6SooWXIECUd0ppCtAaIqEAGGaLVKNFCdb2ZT0TledTm7CHKRokWus4kYGxNBUJ8PcxqmpMaIuweSXGIIGH3F7+kXPwSMPaAlHKIEGWb0UJaighRthmro6WAEGVzywhQdsysIgUoWzGLSAHGVsQaUpCw5egQLdXyQ8KWY4O0FBHeYZOAIF1TQ0N0nY1d+UsBIbbORuW4FBGia2prpBBdDz2/pCAlSI/dI6UcImRVhNk+JoCyuZkBwqYmBuhaE1WUALbWTBMl0HJIV9OGExli637ON5wxQmxtxoCWWndEZM3MTEOqJkam4d6ak5j+LuqzPbrmHH9hXYrcvrrN59yg6WQ+EplIzybqb9BIoaXzR8hQgTK8ijg31XoNFxEJyKA1xLmp1hu4hjhA6QquIc5Vn0q0hEg881XdVRBnlSgFNG2YPPMlPdQP52FVCliayvNPR/15KW1VxY0/2vJUFu1rvLd5PT1I0zOHvzQ1TrUOopp2URiVCaJ6sTAbhrUJw3rx5DqIK1thXGwsCWGpnx5hh0EpbKwMlyoJSpBU75kOCXB6Gg6DSoMCZFGBdqdqNMPkrn542hbGBKrdUKFAsVOn5jVo9WG22UxhFU0dxIVpPWZjhYk9Y2FhZldkKszsQ4YJCwt0u2RzgXbvamuyvQqlCtE7DQr0e5cgLcCwzp2FZUDFd3XFkoMJ6dtpUKDeuwBZk44B+3ZJxtKPvxE8lyu23/7sEIkPW1bDqfJdC9fu//W1/37/CwwH35I=", "Compact mining");


INSERT INTO BlueprintMetadata (created_date, description, b_id, created_by) VALUES (date('now'), "Extremely compact mining", 1, "enoumy");

INSERT INTO owns (b_id, username) VALUES (1, "enoumy");
INSERT INTO owns (b_id, username) VALUES (1, "mennis");
INSERT INTO owns (b_id, username) VALUES (1, "farlan");
