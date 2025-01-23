package com.novaTradeHub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novaTradeHub.models.Asset;
import com.novaTradeHub.models.Coin;
import com.novaTradeHub.models.User;
import com.novaTradeHub.repository.AssetRepository;

@Service
public class AssetServiceImpl implements AssetService {

	@Autowired
	private AssetRepository repository;

	@Override
	public Asset createAsset(User user, Coin coin, double quantity) {
		Asset asset = new Asset();
		asset.setCoin(coin);
		asset.setBuyPrice(coin.getCurrentPrice());
		asset.setCoin(coin);
		asset.setUser(user);
		asset.setQuantity(quantity);
		return repository.save(asset);
	}

	@Override
	public Asset getAssetById(Long assetId) throws Exception {
		Optional<Asset> assetOptional = repository.findById(assetId);
		if (assetOptional.isEmpty()) {
			throw new Exception("Asset not found");
		}
		return assetOptional.get();
	}

	@Override
	public Asset getAssetByUserIdAndId(Long userId, Long assetId) {

		return null;
	}

	@Override
	public List<Asset> getUsersAssets(Long userId) {
		return repository.findByUserId(userId);
	}

	@Override
	public Asset updateAsset(Long assetId, double quantity) throws Exception {
		Asset oldAsset = getAssetById(assetId);
		oldAsset.setQuantity(quantity + oldAsset.getQuantity());
		return repository.save(oldAsset);
	}

	@Override
	public Asset findAssetByUserIdAndCoinId(Long userId, String coinId) {
		return repository.findByUserIdAndCoinId(userId, coinId);
	}

	@Override
	public void deleteAsset(Long assetId) {
		repository.deleteById(assetId);
	}

}
