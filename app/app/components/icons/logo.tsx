import * as React from "react";

function LogoIcon({ height = 24 }: { height?: number } = {}) {
  const aspectRatio = 193 / 47;

  return (
    <svg
      width={Math.round(aspectRatio * height)}
      height={24}
      viewBox="0 0 193 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M72.7441 20.4062V37.2285C72.7441 39.209 72.3223 40.8789 71.4785 42.2383C70.6348 43.5977 69.4688 44.623 67.9805 45.3145C66.5039 46.0059 64.8047 46.3516 62.8828 46.3516C60.9492 46.3516 59.2383 46.0059 57.75 45.3145C56.2617 44.623 55.0957 43.5977 54.252 42.2383C53.4082 40.8789 52.9863 39.209 52.9863 37.2285V20.4062H58.5234V37.2285C58.5234 38.8691 58.9043 40.0586 59.666 40.7969C60.4277 41.5352 61.5 41.9043 62.8828 41.9043C64.2656 41.9043 65.332 41.5352 66.082 40.7969C66.832 40.0586 67.207 38.8691 67.207 37.2285V20.4062H72.7441ZM81.7245 46H76.4159V26.9805H81.408L81.5838 29.1426C82.9315 27.4668 84.742 26.6289 87.0155 26.6289C88.2108 26.6289 89.2596 26.8633 90.162 27.332C91.0643 27.7891 91.7674 28.5508 92.2713 29.6172C92.7752 30.6836 93.0272 32.125 93.0272 33.9414V46H87.701V33.9062C87.701 32.7344 87.4491 31.9492 86.9452 31.5508C86.4412 31.1406 85.7147 30.9355 84.7655 30.9355C84.0623 30.9355 83.4588 31.082 82.9549 31.375C82.451 31.668 82.0409 32.0723 81.7245 32.5879V46ZM96.611 22.0762C96.611 21.291 96.8805 20.6406 97.4196 20.125C97.9587 19.6094 98.6794 19.3516 99.5817 19.3516C100.484 19.3516 101.199 19.6094 101.726 20.125C102.265 20.6406 102.535 21.291 102.535 22.0762C102.535 22.873 102.265 23.5293 101.726 24.0449C101.199 24.5488 100.484 24.8008 99.5817 24.8008C98.6794 24.8008 97.9587 24.5488 97.4196 24.0449C96.8805 23.5293 96.611 22.873 96.611 22.0762ZM102.254 46H96.9274V26.9805H102.254V46ZM116.841 26.9805H122.396L116.033 46H110.9L104.519 26.9805H110.109L113.466 39.4961L116.841 26.9805ZM133.345 46.3516C131.341 46.3516 129.624 45.9355 128.195 45.1035C126.777 44.2715 125.687 43.1582 124.925 41.7637C124.175 40.3691 123.8 38.8281 123.8 37.1406V36.4551C123.8 34.5566 124.158 32.8691 124.872 31.3926C125.599 29.916 126.63 28.7559 127.966 27.9121C129.302 27.0566 130.896 26.6289 132.747 26.6289C135.501 26.6289 137.599 27.4844 139.04 29.1953C140.482 30.8945 141.202 33.1562 141.202 35.9805V38.2305H129.197C129.384 39.3906 129.865 40.3223 130.638 41.0254C131.423 41.7168 132.437 42.0625 133.679 42.0625C134.581 42.0625 135.419 41.8984 136.193 41.5703C136.978 41.2305 137.652 40.7031 138.214 39.9883L140.781 42.9238C140.183 43.7793 139.257 44.5645 138.003 45.2793C136.749 45.9941 135.197 46.3516 133.345 46.3516ZM132.712 30.9004C131.669 30.9004 130.872 31.252 130.322 31.9551C129.771 32.6465 129.408 33.5488 129.232 34.6621H135.982V34.2402C135.97 33.2676 135.701 32.4707 135.173 31.8496C134.658 31.2168 133.837 30.9004 132.712 30.9004ZM149.198 46H143.89V26.9805H148.882L149.058 29.248C149.515 28.4277 150.095 27.7891 150.798 27.332C151.501 26.8633 152.316 26.6289 153.241 26.6289C153.511 26.6289 153.792 26.6523 154.085 26.6992C154.39 26.7344 154.636 26.7871 154.823 26.8574L154.753 31.9727C154.495 31.9375 154.185 31.9082 153.821 31.8848C153.47 31.8496 153.159 31.832 152.89 31.832C151.003 31.832 149.773 32.4473 149.198 33.6777V46ZM167.249 40.6914C167.249 40.1758 166.997 39.748 166.493 39.4082C166.001 39.0566 164.976 38.7168 163.417 38.3887C162.128 38.1191 160.974 37.7441 159.954 37.2637C158.946 36.7715 158.144 36.1445 157.546 35.3828C156.96 34.6211 156.667 33.6895 156.667 32.5879C156.667 31.5215 156.972 30.5371 157.581 29.6348C158.19 28.7324 159.064 28.0059 160.2 27.4551C161.349 26.9043 162.72 26.6289 164.314 26.6289C166.81 26.6289 168.772 27.209 170.202 28.3691C171.644 29.5176 172.364 30.9883 172.364 32.7812H167.056C167.056 32.0664 166.833 31.4863 166.388 31.041C165.954 30.584 165.257 30.3555 164.296 30.3555C163.511 30.3555 162.89 30.543 162.433 30.918C161.976 31.293 161.747 31.7617 161.747 32.3242C161.747 32.8633 161.999 33.3027 162.503 33.6426C163.019 33.9707 163.915 34.252 165.192 34.4863C166.54 34.7559 167.759 35.1133 168.849 35.5586C169.939 35.9922 170.806 36.6074 171.45 37.4043C172.095 38.1895 172.417 39.2207 172.417 40.498C172.417 41.623 172.083 42.625 171.415 43.5039C170.759 44.3828 169.821 45.0801 168.603 45.5957C167.396 46.0996 165.972 46.3516 164.331 46.3516C162.538 46.3516 161.026 46.0293 159.796 45.3848C158.565 44.7402 157.634 43.9258 157.001 42.9414C156.368 41.9453 156.052 40.9316 156.052 39.9004H161.079C161.126 40.8496 161.472 41.541 162.116 41.9746C162.772 42.3965 163.552 42.6074 164.454 42.6074C165.368 42.6074 166.06 42.4316 166.528 42.0801C167.009 41.7285 167.249 41.2656 167.249 40.6914ZM184.368 46.3516C182.364 46.3516 180.647 45.9355 179.218 45.1035C177.8 44.2715 176.71 43.1582 175.948 41.7637C175.198 40.3691 174.823 38.8281 174.823 37.1406V36.4551C174.823 34.5566 175.181 32.8691 175.895 31.3926C176.622 29.916 177.653 28.7559 178.989 27.9121C180.325 27.0566 181.919 26.6289 183.77 26.6289C186.524 26.6289 188.622 27.4844 190.063 29.1953C191.505 30.8945 192.225 33.1562 192.225 35.9805V38.2305H180.22C180.407 39.3906 180.888 40.3223 181.661 41.0254C182.446 41.7168 183.46 42.0625 184.702 42.0625C185.604 42.0625 186.442 41.8984 187.216 41.5703C188.001 41.2305 188.675 40.7031 189.237 39.9883L191.804 42.9238C191.206 43.7793 190.28 44.5645 189.026 45.2793C187.772 45.9941 186.22 46.3516 184.368 46.3516ZM183.735 30.9004C182.692 30.9004 181.895 31.252 181.345 31.9551C180.794 32.6465 180.431 33.5488 180.255 34.6621H187.005V34.2402C186.993 33.2676 186.724 32.4707 186.196 31.8496C185.681 31.2168 184.86 30.9004 183.735 30.9004Z"
        fill="currentColor"
      />
      <rect width="10" height="10" rx="2" fill="#18BFFF" />
      <rect y="19" width="10" height="27" rx="2" fill="#F82B60" />
      <path
        d="M16 2C16 0.89543 16.8954 0 18 0H24C25.1046 0 26 0.895431 26 2V46H18C16.8954 46 16 45.1046 16 44V2Z"
        fill="#FCB400"
      />
      <path
        d="M26 36H39C40.1046 36 41 36.8954 41 38V44C41 45.1046 40.1046 46 39 46H26V36Z"
        fill="#FCB400"
      />
      <path
        d="M26 19H34C35.1046 19 36 19.8954 36 21V27C36 28.1046 35.1046 29 34 29H26V19Z"
        fill="#FCB400"
      />
    </svg>
  );
}

export { LogoIcon };
