const { sequelize, Review, User } = require('../models')


module.exports = {
	async getReviewList(req, res) {
		try {
			const productId = req.params.productId
			const reviews = await Review.findAll({
				where: {
					ProductId: productId
				},
				include: {
					model: User,
					attributes: [
						'profileImage',
						'firstName',
						'lastName'
					]
				},
				order: [
					['createdAt', 'ASC']
				]
			})
			res.send(reviews)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch the reviews.'
			})
		}
	},
	async createReview(req, res) {
		try {
			const review = { rating: parseInt(req.body.rating), comment: req.body.comment, UserId: req.user.id, ProductId: req.body.productId }
			const updatedReview = await Review.create(review)
			res.send(updatedReview)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to create a review.'
			})
		}
	},
	async updateReview(req, res) {
		try {
			const review = { rating: parseInt(req.body.rating), comment: req.body.comment, UserId: req.user.id, ProductId: req.body.productId }
			await Review.update(review, {
				where: {
					id: req.body.id
				}
			})
			res.send(review)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to update a review.'
			})
		}
	},
	async deleteReview(req, res) {
		try {
			const review = await Review.findByPk(req.params.reviewId)

			if (!review) {
				return res.status(403).send({
					error: 'No review to delete.'
				})
			}
			await review.destroy()
			res.send(review)

		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete a review.'
			})
		}
	},
}
