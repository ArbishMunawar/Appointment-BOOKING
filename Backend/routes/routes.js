import adminRoute from '../routes/admin.route.js'
// import doctorRoute from '../routes/doctor.route.js'

export default function(app) {
  app.use('/api/admin', adminRoute);
//   app.use('/api/doctor', doctorRoute);
}