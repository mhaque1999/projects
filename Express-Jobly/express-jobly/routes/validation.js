async function validation(){
    try {
        const validator = jsonschema.validate(query, companySearchSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs);
        }
        const companies = await Company.findAll();
        return res.json({ companies });
      } catch (err) {
        return next(err);
      }
}
