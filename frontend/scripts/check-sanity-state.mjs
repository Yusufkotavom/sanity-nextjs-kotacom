import { createSanityWriteClient, loadSanityEnv } from "./lib/sanity-page-guards.mjs";

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  const serviceTypes = await client.fetch('*[_type == "serviceType"] | order(_id) { _id, title, category }');
  const services = await client.fetch('*[_type == "service"] | order(_id) { _id, title }');
  const serviceLocations = await client.fetch('*[_type == "serviceLocation" && defined(service)] | order(_id) { _id, title, "serviceRef": service._ref }');

  console.log('\n📊 Current Sanity State:\n');
  console.log(`ServiceTypes: ${serviceTypes.length}`);
  console.log(`Services (old): ${services.length}`);
  console.log(`ServiceLocations with service ref: ${serviceLocations.length}`);
  
  if (services.length > 0) {
    console.log('\n❌ Remaining old service documents:');
    services.forEach(s => console.log(`  - ${s._id}: ${s.title}`));
  }

  if (serviceLocations.length > 0) {
    console.log('\n⚠️  ServiceLocations still referencing old service:');
    serviceLocations.slice(0, 5).forEach(sl => console.log(`  - ${sl._id} -> ${sl.serviceRef}`));
    if (serviceLocations.length > 5) {
      console.log(`  ... and ${serviceLocations.length - 5} more`);
    }
  }

  if (serviceTypes.length > 0) {
    console.log('\n✅ ServiceTypes created:');
    serviceTypes.slice(0, 10).forEach(st => console.log(`  - ${st._id}: ${st.title} (${st.category})`));
    if (serviceTypes.length > 10) {
      console.log(`  ... and ${serviceTypes.length - 10} more`);
    }
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
