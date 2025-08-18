import adminRoute from '../routes/admin.route.js'
import doctorRoute from '../routes/doctor.route.js'
import userRoute from '../routes/user.route.js'
console.log("testing")
export default function(app) {
  app.use('/api/admin', adminRoute);
  app.use('/api/doctor', doctorRoute);
  app.use('/api/user', userRoute);
}