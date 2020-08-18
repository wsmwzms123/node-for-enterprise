const Yup = require('yup')

exports.createShopFormSchema = () =>
  Yup.object({
    name: Yup.string()
      .required('店铺不能为空')
      .min(3, '店铺名至少三个字符')
      .max(120, '店铺名不能超过120个字')
  })
